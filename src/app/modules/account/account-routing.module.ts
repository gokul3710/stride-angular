import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AddressesComponent } from './pages/addresses/addresses.component';
import { AddAddressComponent } from './pages/add-address/add-address.component';
import { CartComponent } from './pages/cart/cart.component';
import { AuthGuard } from './guards/auth.guard';
import { EditAddressComponent } from './pages/edit-address/edit-address.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { PaymentsComponent } from './pages/payments/payments.component';

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
