import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { ProfileComponent } from './profile/profile/profile.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './checkout/cart/cart.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AddressService } from './services/address/address.service';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { CheckoutComponent } from './checkout/checkout/checkout.component';
import { CheckoutService } from './services/checkout/checkout.service';
import { OrderService } from './services/orders/order.service';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ProfileComponent,
    EditProfileComponent,
    CartComponent,
    ChangePasswordComponent,
    CheckoutComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ImageCropperModule,
    MatDialogModule,
    SharedModule
  ],
  providers: [
    AddressService,
    CheckoutService,
    OrderService
  ],
})
export class AccountModule { }
