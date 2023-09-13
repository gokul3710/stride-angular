import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { OrdersComponent } from './orders/orders/orders.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { AddressesComponent } from './address/addresses/addresses.component';
import { AddAddressComponent } from './address/add-address/add-address.component';
import { CartComponent } from './checkout/cart/cart.component';
import { EditAddressComponent } from './address/edit-address/edit-address.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { CheckoutComponent } from './checkout/checkout/checkout.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { PaymentsComponent } from './orders/payments/payments.component';

const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'edit', component: EditProfileComponent },
  { path: 'address', component: AddressesComponent },
  { path: 'address/add', component: AddAddressComponent },
  { path: 'address/edit/:id', component: EditAddressComponent },
  { path: 'orders', component: OrdersComponent},
  { path: 'order/:id', component: OrderDetailsComponent },
  { path: 'payments', component: PaymentsComponent },
  { path: 'change-password', component:ChangePasswordComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout',component: CheckoutComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
