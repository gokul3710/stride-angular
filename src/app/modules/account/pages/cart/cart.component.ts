import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Observable, Subscription } from 'rxjs';
import { GetMRPPipe } from '../../pipes/get-mrp.pipe';
import { GetTaxPipe } from '../../pipes/get-tax.pipe';
import { host } from '../../../../../environments/environment';
import { solid } from 'src/app/icons/solid.icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [GetMRPPipe, GetTaxPipe]
})
export class CartComponent implements OnInit,OnDestroy {

  //icons
  solid = solid
  host = host

  //properties
  cartProducts$!: Observable<any>
  couponCode!: string
  cartTotal!: any
  couponState!: boolean;
  deleteProductId!: string

  //errors
  couponError!: string

  //coupon
  @ViewChild('couponInput') couponInput!: ElementRef<HTMLInputElement>

  //modal
  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>

  //subscriptions
  private cartExtrasSubscription!: Subscription

  constructor(private location: Location, private cartService: CartService) { }

  ngOnInit(): void {
    this.cartProducts$ = this.cartService.cartProducts

    this.cartExtrasSubscription = this.cartService.cartExtras.subscribe(
      (response: any) => {
        this.cartTotal = response
        if (response.couponCode) {
          this.couponCode = response.couponCode
          this.couponState = true
        }
      }
    )
  }

  goBack(): void {
    this.location.back();
  }

  async handleCouponSubmit() {
    let coupon = {
      couponCode: this.couponCode,
      subtotal: this.cartTotal.subtotal
    }
    let error = await this.cartService.useCoupon(coupon)
    if (error) {
      if (error.includes("Invalid Request")) {
        this.couponError = "Must Enter a Coupon Code"
      }
      this.couponError = error
    } else {
      this.couponError = ''
      this.couponState = true
    }
  }

  async handleRemoveCoupon() {
    let error = await this.cartService.removeCoupon()
    if(error){
      this.couponError = error.error.message
    }else{
      this.couponState = false
      this.couponError = '' 
      this.couponCode = ''
    }
  }

  changeProductQuantity(product: any, count: number) {
    this.cartService.updateCartProductQuantity(product.product._id, count)
  }

  getModalResult(productId: string) {
    this.modal.nativeElement.showModal()
    this.deleteProductId = productId
  }

  onConfirm(confirmed: boolean) {
    if (confirmed) {
      let state = this.cartService.deleteCartProducts(this.deleteProductId)
      this.modal.nativeElement.close()
    } else {
      this.modal.nativeElement.close()
    }
  }

  ngOnDestroy(){
    this.cartExtrasSubscription.unsubscribe()
  }
}
