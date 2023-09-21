import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressRoutingModule } from './address-routing.module';
import { AddressesComponent } from './addresses/addresses.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddressesComponent,
    EditAddressComponent,
    AddAddressComponent
  ],
  imports: [
    CommonModule,
    AddressRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AddressModule { }
