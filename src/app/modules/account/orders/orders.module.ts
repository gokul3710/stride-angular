import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersComponent } from './orders/orders.component';
import { PaymentsComponent } from './payments/payments.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    OrdersComponent,
    OrderDetailsComponent,
    PaymentsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: OrdersComponent},
      { path: 'payments', component: PaymentsComponent },
      { path: ':id', component: OrderDetailsComponent },
    ]),
    SharedModule
  ]
})
export class OrdersModule { }
