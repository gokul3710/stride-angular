import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetMRPPipe } from './pipes/get-mrp.pipe';
import { GetTaxPipe } from './pipes/get-tax.pipe';
import { HomeLoaderComponent } from './components/home-loader/home-loader.component';
import { AddressCardComponent } from './components/address-card/address-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './components/loader/loader.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
    GetMRPPipe,
    GetTaxPipe,
    HomeLoaderComponent,
    AddressCardComponent,
    LoaderComponent,
    ConfirmModalComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule
  ],
  exports:[
    GetMRPPipe,
    GetTaxPipe,
    HomeLoaderComponent,
    AddressCardComponent,
    FontAwesomeModule,
    LoaderComponent,
    ConfirmModalComponent
  ],
})
export class SharedModule { }
