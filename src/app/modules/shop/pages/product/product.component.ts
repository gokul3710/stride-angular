import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { productModel } from 'src/app/core/models/product.model';
import { CommonModule, Location } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Observable, Subscription } from 'rxjs';
import { domain, host } from '../../../../../environments/environment';
import { CartService } from 'src/app/modules/account/services/cart.service';
import { solid } from 'src/app/core/icons/solid.icons';
import { FormsModule } from '@angular/forms';
import { GetMRPPipe } from 'src/app/shared/pipes/get-mrp.pipe';
import { GetTaxPipe } from 'src/app/shared/pipes/get-tax.pipe';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ProductPageShimmerComponent } from '../../shimmers/product-page-shimmer/product-page-shimmer.component';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    FormsModule,
    SharedModule,
    ToastrModule,
    ProductPageShimmerComponent
  ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [
    ProductService,
    GetMRPPipe,
    GetTaxPipe,
    ToastrService
  ]
})
export class ProductComponent implements OnInit, OnDestroy {

  //icons
  solid = solid
  domain = domain
  host = host

  //properties
  param!: string
  product$!: Observable<productModel>

  productQuantity: number = 1
  couponCode: string = ''
  couponError!: string
  couponState!: boolean;
  discount: number = 0

  //cart
  cartCount$!: Observable<number>

  //Product Main Image
  @ViewChild('mainImage') mainImage!: ElementRef<HTMLImageElement>

  //coupon
  @ViewChild('couponInput') couponInput!: ElementRef<HTMLInputElement>

  //buyNow
  @ViewChild('buyNow') buyNow!: ElementRef<HTMLDialogElement>

  //subscriptions
  paramSubscription!: Subscription
  productSubscription!: Subscription

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private location: Location,
    private cartService: CartService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.cartCount$ = this.cartService.cartCount
    this.paramSubscription = this.route.paramMap.subscribe(
      (params) => {
        this.param = params.get('id')!
        this.product$ = this.productService.getProductById(this.param)
      }
    )
  }

  changeCount(product: productModel, change: -1 | 1) {
    if (change + this.productQuantity < 1) {
      return false
    } else if (change + this.productQuantity > product.stock) {
      // this.toastr.error('Out of Stock')
      return false
    }
    this.productQuantity += change
    return true
  }

  handleAddToCart(product: productModel) {
    this.cartService.addProductToCart(product)
  }

  changeImage(event: any) {
    this.mainImage.nativeElement.src = event.target.currentSrc
  }

  goBack() {
    this.location.back()
  }

  share(product: productModel) {
    if (navigator.share) {
      navigator.share({
        title: product.brand + " " + product.model,
        text: product.description,
        url: this.domain + '/product/' + product._id,
      })
        .then(() => console.log('Share successful'))
        .catch((error) => console.log('Share failed', error));
    } else {
      console.log('Web Share API not supported');
    }
  }

  handleBuyNow(product: productModel, count: number, discount: number) {
    if (localStorage.getItem('token')) {
      const directBuy: any = {
        item: {
          id: 1,
          item: product._id,
          quantity: count,
          product: product,
          total: product.price * count
        },
        count,
        extras: {
          shipping: 0,
          subtotal: product.price * count,
          items: 1,
          discount: discount
        }
      }
      this.cartService.handleDirectBuy(directBuy.item, directBuy.count, directBuy.extras)
      this.router.navigateByUrl('/account/checkout')
      this.buyNow.nativeElement.close()
    } else {
      this.toastr.error('Login to Continue')
    }
    this.buyNow.nativeElement.close()
  }

  closeBuyNow() {
    this.buyNow.nativeElement.close()
  }

  async handleCouponSubmit(product: productModel) {
    if(!this.couponCode.trim()){
      this.couponError = "Must Enter a Coupon Code"
      return
    }
    let coupon = {
      couponCode: this.couponCode,
      subtotal: product.price * this.productQuantity
    }
    let response = await this.cartService.useCouponDirectBuy(coupon)

    if (response?.error) {
      if ((response.error as string).includes("Invalid Request")) {
        this.couponError = "Must Enter a Coupon Code"
      }
      this.couponError = response.error
    } else {
      this.discount = response.amount
      this.couponError = ''
      this.couponState = true
      this.toastr.success("Coupon Added")
    }
  }

  async handleRemoveCoupon() {
      this.discount = 0
      this.couponState = false
      this.couponError = ''
      this.couponCode = ''
      this.toastr.error("Coupon Removed")
  }

  openBuyNow() {
    this.buyNow.nativeElement.showModal()
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe()
  }

}
