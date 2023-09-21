import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { CartComponent } from './checkout/cart/cart.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { CheckoutComponent } from './checkout/checkout/checkout.component';

const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'edit', component: EditProfileComponent },
  { path: 'change-password', component:ChangePasswordComponent },
  { path: 'address',  loadChildren: () => import('./address/address.module').then(m => m.AddressModule)},
  { path: 'orders',  loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)},
  { path: 'cart', component: CartComponent },
  { path: 'checkout',component: CheckoutComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
