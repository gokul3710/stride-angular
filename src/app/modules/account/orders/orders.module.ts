import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { PaymentsComponent } from './payments/payments.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    OrdersComponent,
    OrderDetailsComponent,
    PaymentsComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule
  ]
})
export class OrdersModule { }
