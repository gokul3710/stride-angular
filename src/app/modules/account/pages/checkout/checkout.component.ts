import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckoutService } from '../../services/checkout.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { addressModel } from 'src/app/models/address.model';
import { Subscription } from 'rxjs';
import { GetTaxPipe } from '../../pipes/get-tax.pipe';
import { GetMRPPipe } from '../../pipes/get-mrp.pipe';
import { host } from '../../../../../environments/environment';
import { AddressService } from '../../services/address.service';
import { solid } from 'src/app/icons/solid.icons';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

declare const Razorpay: any

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [GetMRPPipe,GetTaxPipe]
})
export class CheckoutComponent implements OnInit,OnDestroy {

  //icons
  solid = solid
  host = host

  //properties
  addressForm!: FormGroup
  addresses!: addressModel[]
  deliveryAddress!: addressModel
  cartItemsSubscription!: Subscription
  cartItems!: any
  cartTotal!: any
  paymentMethod: 'COD' | 'PAYPAL' | 'RAZORPAY' = 'COD'
  rzp: any

  //subscriptions
  addAddressSubscription! : Subscription
  placeOrderSubscription! : Subscription
  getCartExtrasSubscription! : Subscription
  getCartProductsSubscription! : Subscription
  getAllAddressesSubscription! : Subscription


  constructor(
    private checkoutService: CheckoutService,
    private formBuilder: FormBuilder, 
    private router: Router,
    private location: Location,
    private cartService: CartService,
    private addressService: AddressService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.cartItemsSubscription = this.cartService.cartProducts.subscribe(
      (cartItems)=>{

        if(!cartItems.length){
          this.toastr.error('Cart is Empty')
          this.router.navigateByUrl('/account/cart')
          return
        }
        
        this.cartItems= cartItems
        for (let item of this.cartItems) {
          item.product.quantity = item.quantity
          item.product.total = item.total
        }
        this.cartItems = this.cartItems.map((item: any) => item.product)
      }
    )

    this.getCartExtrasSubscription = this.cartService.cartExtras.subscribe(
      (response) => {
        this.cartTotal = response
      }
    )

    if (!this.addresses) {
      this.addressService.addresses.subscribe(
        (response) => {
          this.addresses = response
          if(this.addresses.length > 0){
            this.deliveryAddress = this.addressService.getDefaultAddress()
          }else{
            this.addresses = []
            this.deliveryAddress = {
              name: '',
              phone: '',
              street: '',
              house: '',
              city: '',
              state: '',
              pincode: '',
              landmark: '',
              _id : ''
            }
          }

          this.addressForm = this.formBuilder.group({
            name: [this.deliveryAddress.name, [Validators.required, Validators.minLength(3)]],
            phone: [this.deliveryAddress.phone, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
            street: [this.deliveryAddress.street, [Validators.required, Validators.minLength(3)]],
            house: [this.deliveryAddress.house, [Validators.required]],
            city: [this.deliveryAddress.city, [Validators.required]],
            state: [this.deliveryAddress.state, [Validators.required]],
            pincode: [this.deliveryAddress.pincode, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
            landmark: [this.deliveryAddress.landmark]
          })
        }
      )
    }
  }

  goBack(): void {
    this.location.back();
  }

  get r() {
    return this.addressForm.controls
  }

  setDeliveryAddress(index: number) {
    this.deliveryAddress = this.addresses[index]
    for (let address of this.addresses) {
      address.default = false
    }
    this.addresses[index].default = true
    this.setAddressForm(this.addresses[index])
  }

  setAddressForm(address: addressModel) {
    this.addressForm.setValue({
      name: address.name,
      phone: address.phone,
      street: address.street,
      house: address.house,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      landmark: address.landmark,
    });
  }

  onPlaceOrder() {
    if (!this.addressForm.valid) {
      return false
    }

    if (this.cartItems.length < 1) {
      return false
    }

    let order = {
      address: this.addressForm.value,
      items: this.cartItems,
      payment: {},
      total: this.cartTotal.subtotal,
      quantity: this.cartTotal.items,
      discount: this.cartTotal.discount
    }

    if (this.paymentMethod === 'COD') {

      let payment = {
        method: 'COD',
        status: 'pending',
        amount: this.cartTotal.subtotal - this.cartTotal.discount,
        currency: 'INR',
        date: false
      }

      order.payment = payment
      
      this.checkoutService.placeOrder(order).subscribe(
        (response) => {
          this.router.navigateByUrl(`/account/order/${response}`)
        }
      )
      return true
    } else if (this.paymentMethod === 'RAZORPAY') {

      
      let amount = (this.cartTotal.subtotal - this.cartTotal.discount) * 100
      
      const options = {
        key: 'rzp_test_UQCn88IlkSNzYQ', // replace with your API key
        amount:  amount,
        currency: 'INR',
        name: 'STRIDE AVENUE',
        description: 'Payment for your order', 
        handler: (response: any) => {
          
          let payment =  {
            method: 'RAZORPAY',
            status: 'paid',
            amount: this.cartTotal.subtotal - this.cartTotal.discount,
            currency: 'INR',
            date: new Date(),
            transactionId: response.razorpay_payment_id 
          }

          order.payment = payment

          this.checkoutService.placeOrder(order).subscribe(
            (response) => {
              this.router.navigateByUrl(`/account/order/${response}`)
            }
          )
        
        },
        
        prefill: {
          email: 'admin@stride.com',
          contact: '7810340312'
        },
        notes: {
          address: 'Your Company Address'
        },
        theme: {
          color: '#4d99ff'
        }
      };
      this.rzp = new Razorpay(options);
      this.rzp.open();
    }
    return false
  }


  handleAddAddress(){
    if(this.addressForm.valid){
      this.addressService.addNewAddress(this.addressForm.value, {checkout: true})
    }
  }

  ngOnDestroy(): void {
      this.cartService.completeDirectBuy()
  }

  // ngOnDestroy(){
  //   this.addAddressSubscription.unsubscribe()
  //   this.placeOrderSubscription.unsubscribe()
  //   this.getCartExtrasSubscription.unsubscribe()
  //   this.getCartProductsSubscription.unsubscribe()
  //   this.getAllAddressesSubscription.unsubscribe()
  // }
}
