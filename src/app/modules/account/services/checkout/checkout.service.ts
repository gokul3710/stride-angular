import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { host } from 'src/environments/environment';
import { Routes } from 'src/environments/routes';


@Injectable()
export class CheckoutService {

  constructor(private http: HttpClient) { }

  placeOrder(orderData: any){
    let order = {
      deliveryAddress: orderData.address,
      items: orderData.items,
      tracking: {
        placed: new Date(),
        packed: false,
        shipped: false,
        arrived: false,
        delivered: false,
        returned: false,
      },
      payment: orderData.payment,
      status: 'placed',
      total: Number(orderData.total),
      quantity: Number(orderData.quantity),
      discount: Number(orderData.discount)
    }

    return this.http.post(`${host}${Routes.PLACE_ORDER}`,order)
  }
}
