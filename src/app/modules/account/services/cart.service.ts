import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { cartExtasModel } from 'src/app/core/models/cartExtras.model';
import { cartProductModel } from 'src/app/core/models/cartProduct.model';
import { couponModel } from 'src/app/core/models/coupon.model';
import { productModel } from 'src/app/core/models/product.model';
import { host } from 'src/environments/environment';
import { Routes } from 'src/environments/routes';


@Injectable({
  providedIn: 'root'
})
export class CartService implements OnDestroy {

  private cartProducts$ = new BehaviorSubject<cartProductModel[]>([])
  private cartCount$ = new BehaviorSubject<number>(0)
  private cartExtras$ = new BehaviorSubject<cartExtasModel>({
    shipping: 0,
    subtotal: 0,
    items: 0,
    discount: 0
  })

  //subscriptions
  private fetchCartProductsSubscription!: Subscription
  private fetchCartExtrasSubscription!: Subscription
  private deleteCartProductsSubscription!: Subscription
  private updateCartProductQuantitySubscription!: Subscription
  private addProductToCartSubscription!: Subscription

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {
    if(localStorage.getItem('token')){
      
    }
    this.fetchCartProducts()
    this.fetchCartExtras()
  }


  fetchCartProducts() {
    if (localStorage.getItem('token')) {
      this.http.get<cartProductModel[]>(`${host}${Routes.GET_CART_PRODUCTS}`).subscribe({
        next: (response) => {
          this.cartProducts$.next(response);
          this.getCartTotal(0)
        },
        error: (err) => {
          this.toastr.error(err.error.message)
          console.log('Error fetching cartProducts:', err);
        }
      });
    }
  }

  fetchCartExtras() {
    if (localStorage.getItem('token')) {
      this.http.get<cartExtasModel>(`${host}${Routes.GET_CART_TOTAL}`).subscribe({
        next: (response) => {
          this.cartExtras$.next(response);

          this.cartCount$.next(response.items)
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          if (err.error.message === "Invalid token") {
            this.toastr.error("Login To Continue")
            localStorage.removeItem('token')
          } else {
            this.toastr.error(err.error.message)
            console.log('Error fetching cartExtras:', err.error.message);
          }
        }
      });
    }
  }

  get cartProducts(): Observable<cartProductModel[]> {
    return this.cartProducts$
  }

  get cartExtras(): Observable<cartExtasModel> {
    return this.cartExtras$
  }

  get cartCount(): Observable<number> {
    return this.cartCount$
  }

  deleteCartProducts(productId: string) {
    this.http.delete(`${host}${Routes.REMOVE_FROM_CART}/${productId}`).subscribe({
      next: (response) => {
        let cartProducts = this.cartProducts$.getValue()
        let deleteProduct = cartProducts.filter(cartProduct => cartProduct.item === productId)[0]
        cartProducts = cartProducts.filter(cartProduct => cartProduct.item !== productId)
        this.cartProducts$.next(cartProducts)
        this.getCartTotal(-deleteProduct.quantity)
        this.toastr.error('Product Removed From Cart')
        return true
      },
      error: (err) => {
        if (err.error.message === "Invalid token") {
          this.toastr.error("Login To Continue")
          localStorage.removeItem('token')
        } else {
          this.toastr.error(err.error.message)
          console.log('Error fetching cartExtras:', err);
        }
      }
    })
  }

  updateCartProductQuantity(productId: string, count: number) {
    this.http.patch(`${host}${Routes.CHANGE_QUANTITY}`, { productId, count }).subscribe({
      next: (response) => {
        let cartProducts = this.cartProducts$.getValue()
        cartProducts = cartProducts.map((cartProduct) => {
          if (cartProduct.item === productId) {
            cartProduct.quantity += count
          }
          return cartProduct
        })
        this.cartProducts$.next(cartProducts)
        this.getCartTotal(count)
        return true
      },
      error: (err) => {
        if (err.error.message === "Invalid token") {
          this.toastr.error("Login To Continue")
          localStorage.removeItem('token')
        } else {
          this.toastr.error(err.error.message)
          console.log('Error fetching cartExtras:', err);
        }
      }
    })
  }

  addProductToCart(product: productModel, count: number = 1) {
    count = count ? count : 1
    this.http.post(`${host}${Routes.ADD_TO_CART}`, { productId: product._id, count }).subscribe({
      next: (response) => {
        let cartProducts = this.cartProducts$.getValue()
        let cartProductExist = cartProducts.findIndex(cartProduct => cartProduct.item === product._id)
        if (cartProductExist != -1) {
          cartProducts = cartProducts.map((cartProduct) => {
            if (cartProduct.item === product._id) {
              cartProduct.quantity += count,
                cartProduct.total += count * product.price
            }
            return cartProduct
          })
        } else {
          let cartProduct: cartProductModel = {
            _id: (response as string),
            item: product._id!,
            quantity: count,
            product,
            total: product.price * count
          }
          cartProducts = [...cartProducts, cartProduct]
        }
        this.cartProducts$.next(cartProducts)
        this.getCartTotal(count)
        this.toastr.success("Item Added To Cart")
      },
      error: (err) => {
        if (err.error.message === "Invalid token") {
          this.toastr.error("Login To Continue")
          localStorage.removeItem('token')
        } else {
          this.toastr.error(err.error.message)
          console.log('Error fetching cartExtras:', err);
        }
      }
    })
  }

  getCartTotal(count: number) {
    let cartProducts = this.cartProducts$.getValue()
    let cartSubTotal = cartProducts.reduce((sum: number, item) => { return sum += item.quantity * item.product.price }, 0)
    let cartExtras = this.cartExtras$.getValue()
    cartExtras.subtotal = cartSubTotal
    cartExtras.items += count
    this.cartExtras$.next(cartExtras)
    this.cartCount$.next(cartExtras.items)
  }

  async useCoupon(coupon: { couponCode: string, subtotal: number }): Promise<any> {
    try {
      const response = await this.http.patch<couponModel>(`${host}${Routes.ADD_COUPON_TO_CART}`, coupon).toPromise();
      let cartExtras = this.cartExtras$.getValue();
      cartExtras.discount = response!.amount;
      this.cartExtras$.next(cartExtras);
      this.getCartTotal(0);
      this.toastr.success("Coupon Added")
      return null;
    } catch (err: any) {
      console.log(err);
      
      if (err.error.message === "Invalid Token") {
        this.toastr.error("Login To Continue")
        localStorage.removeItem('token')
      } else {
        this.toastr.error(err.error.message)
        console.log('Error fetching cartExtras:', err);
        return err.eroor.message
      }
    }
  }

  async removeCoupon(): Promise<any> {
    try {
      const response = await this.http.patch(`${host}${Routes.REMOVE_COUPON_FROM_CART}`, {}).toPromise();
      let cartExtras = this.cartExtras$.getValue()
      cartExtras.discount = 0
      this.cartExtras$.next(cartExtras)
      this.getCartTotal(0)
      this.toastr.error("Coupon Removed")
      return null;
    } catch (err: any) {
      if (err.error.message === "Invalid Token") {
        this.toastr.error("Login To Continue")
        localStorage.removeItem('token')
      } else {
        this.toastr.error(err.error.message)
        console.log('Error fetching cartExtras:', err);
      }
    }
  }

  async useCouponDirectBuy({couponCode, subtotal}): Promise<any> {
    try {
      const coupon = await this.http.get<couponModel>(`${host}${Routes.GET_COUPON_BY_CODE}/${couponCode}`, {}).toPromise();
      if (coupon) {
        if (coupon?.minPurchase > subtotal) {
          return { error: 'Minimum purchase not met.' }
        }

        if (new Date(coupon?.expiry) < new Date()) {
          return { error: "Coupon Expired." }
        }

        return coupon

      } else {
        return { error: 'Invalid Coupon' }
      }
    } catch (err: any) {
      if (err.error.message === "Invalid Token") {
        this.toastr.error("Login To Continue")
        localStorage.removeItem('token')
        return {error: err.error}
      } else {
        this.toastr.error(err.error.message)
        console.log('Error fetching cartExtras:', err);
        return {error: err.error}
      }
    }
  }

  // removeCouponDirectBuy(){
  //   let cartExtras = this.cartExtras$.getValue()
  //   cartExtras.discount = 0
  //   this.cartExtras$.next(cartExtras)
  //   this.getCartTotal(0)
  //   this.toastr.error("Coupon Removed")
  // }



  handleDirectBuy(item: cartProductModel, count: number, extras: cartExtasModel) {

    this.cartProducts$.next([item])
    this.cartCount$.next(count)
    this.cartExtras$.next(extras)

  }

  completeDirectBuy() {
    this.fetchCartProducts()
    this.fetchCartExtras()
  }

  ngOnDestroy(): void {
    this.fetchCartProductsSubscription.unsubscribe()
    this.fetchCartExtrasSubscription.unsubscribe()
    this.deleteCartProductsSubscription.unsubscribe()
    this.updateCartProductQuantitySubscription.unsubscribe()
    this.addProductToCartSubscription.unsubscribe()
  }
}
