import { Component, OnDestroy, OnInit } from '@angular/core';
import { regular } from '../../../../icons/regular.icons';
import { solid } from '../../../../icons/solid.icons';
import { Location } from '@angular/common';
import { OrderService } from '../../services/order.service';
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

  constructor(private location : Location, private orderService: OrderService){}
  
  ngOnInit(): void {
      this.getPaymentsSubscription = this.orderService.getPayments().subscribe(
      (response)=>{
        this.payments = response
        console.log(response);
      }
    )
  }

  ngOnDestroy(){
    this.getPaymentsSubscription.unsubscribe()
  }

  
}
