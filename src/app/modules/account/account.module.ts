import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { ProfileComponent } from './profile/profile/profile.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { OrdersComponent } from './orders/orders/orders.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddressesComponent } from './address/addresses/addresses.component';
import { AddAddressComponent } from './address/add-address/add-address.component';
import { CartComponent } from './checkout/cart/cart.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AddressCardComponent } from './shared/address-card/address-card.component';
import { AddressService } from './services/address.service';
import { EditAddressComponent } from './address/edit-address/edit-address.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { CheckoutComponent } from './checkout/checkout/checkout.component';
import { CheckoutService } from './services/checkout.service';
import { OrderService } from './services/order.service';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { ConfirmModalComponent } from './shared/confirm-modal/confirm-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PaymentsComponent } from './orders/payments/payments.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ProfileComponent,
    EditProfileComponent,
    OrdersComponent,
    AddressesComponent,
    AddAddressComponent,
    CartComponent,
    AddressCardComponent,
    EditAddressComponent,
    ChangePasswordComponent,
    CheckoutComponent,
    OrderDetailsComponent,
    ConfirmModalComponent,
    PaymentsComponent,
    LoaderComponent,
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
