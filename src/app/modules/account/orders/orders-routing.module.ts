import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { PaymentsComponent } from './payments/payments.component';

const routes: Routes = [
  { path: '', component: OrdersComponent},
  { path: 'payments', component: PaymentsComponent },
  { path: ':id', component: OrderDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
