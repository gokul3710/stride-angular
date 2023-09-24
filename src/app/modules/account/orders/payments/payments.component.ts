import { Component, OnDestroy, OnInit } from '@angular/core';
import { regular } from '../../../../core/icons/regular.icons';
import { solid } from '../../../../core/icons/solid.icons';
import { Location } from '@angular/common';
import { OrderService } from '../../services/orders/order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit,OnDestroy {

  //icons
  regular = regular
  solid = solid

  //properties
  payments: any

  //subscriptions
  private getPaymentsSubscription!: Subscription

  constructor(private orderService: OrderService){}
  
  ngOnInit(): void {
      this.getPaymentsSubscription = this.orderService.getPayments().subscribe(
      (response)=>{
        console.log(response)
        this.payments = response
      },
      (err)=>{
        console.log(err)
      }
    )
    console.log(this.payments)
  }

  ngOnDestroy(){
    this.getPaymentsSubscription.unsubscribe()
  }

  
}
