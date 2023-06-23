import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { WalletComponent } from './pages/wallet/wallet.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddressesComponent } from './pages/addresses/addresses.component';
import { AddAddressComponent } from './pages/add-address/add-address.component';
import { CartComponent } from './pages/cart/cart.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { UserAccountService } from './services/user-account.service';
import { AddressCardComponent } from './components/address-card/address-card.component';
import { AddressService } from './services/address.service';
import { EditAddressComponent } from './pages/edit-address/edit-address.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CheckoutService } from './services/checkout.service';
import { OrderService } from './services/order.service';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { GetMRPPipe } from './pipes/get-mrp.pipe';
import { GetTaxPipe } from './pipes/get-tax.pipe';
import { PaymentsComponent } from './pages/payments/payments.component';
import { LoaderComponent } from './components/loader/loader.component';



@NgModule({
  declarations: [
    AccountComponent,
    ProfileComponent,
    EditProfileComponent,
    OrdersComponent,
    WalletComponent,
    AddressesComponent,
    AddAddressComponent,
    CartComponent,
    AddressCardComponent,
    EditAddressComponent,
    ChangePasswordComponent,
    CheckoutComponent,
    OrderDetailsComponent,
    ConfirmModalComponent,
    GetMRPPipe,
    GetTaxPipe,
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
    MatDialogModule
  ],
  exports:[
    GetMRPPipe,
    GetTaxPipe,
  ],
  providers: [
    AddressService,
    CheckoutService,
    OrderService
  ],
})
export class AccountModule { }
