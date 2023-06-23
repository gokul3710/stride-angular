import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subscription, map } from 'rxjs';
import { orderModel } from 'src/app/models/order.model';
import { host } from 'src/environments/environment';
import { Routes } from 'src/environments/routes';


@Injectable()
export class OrderService implements OnDestroy {

  orders$ = new BehaviorSubject<orderModel[]>([])
  order$ = new BehaviorSubject<orderModel>({
    deliveryAddress: {
      _id: '',
      name: '',
      phone: '',
      house: '',
      street: '',
      city: '',
      state: '',
      pincode: ''
    },
    items: [],
    tracking: {},
    payment: '',
    status: 'pending',
    total: 0,
    quantity: 0,
    discount: 0
  })


  //subscriptions
  private fetchOrdersSubscription!: Subscription
  private cancelOrderSubscription!: Subscription

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) {
    this.fetchOrders()
  }

  get orders(): Observable<orderModel[]> {
    return this.orders$
  }

  get deliveredOrders(): Observable<orderModel[]> {
    return this.orders$.pipe(
      map((orders: orderModel[]) => orders.filter((order) => order.status === 'delivered'))
    );
  }


  fetchOrders() {
    this.http.get<orderModel[]>(`${host}${Routes.GET_ORDERS}`).subscribe({
      next: (response) => {
        console.log(response);
        this.orders$.next(response)
        return true
      },
      error: (err) => {
        if (err.error.message === "Invalid token") {
          this.toastr.error("Login To Continue")
          localStorage.removeItem('token')
        } else {
          this.toastr.error(err.error.message)
          console.log('Error fetching orders:', err);
        }
      }
    })
  }

  getOrder(orderId: string): Observable<orderModel> {
    return this.orders$.pipe(
        map((orders: orderModel[]) => orders.filter((order) => order._id === orderId)[0])
      );

  }

  cancelOrder(orderId: string) {
    this.http.patch<orderModel>(`${host}${Routes.CANCEL_ORDER}`, { orderId}).subscribe({
      next: (orderResponse) => {
        let orders = this.orders$.getValue()
        orders = orders.map((order) => {
          if (order._id === orderResponse._id) {
            return orderResponse
          } else {
            return order
          }
        });
        console.log(orders);
        
        this.orders$.next(orders)
        this.order$.next(orderResponse)
      },
      error: (err) => {
        if (err.error.message === "Invalid token") {
          this.toastr.error("Login To Continue")
          localStorage.removeItem('token')
        } else {
          this.toastr.error(err.error.message)
          console.log('Error fetching orders:', err);
        }
      }
    })
  }

  getPayments() {
    return this.http.get(`${host}${Routes.GET_PAYMENTS}`)
  }

  ngOnDestroy(){
    this.fetchOrdersSubscription.unsubscribe()
    this.cancelOrderSubscription.unsubscribe()
  }
}
