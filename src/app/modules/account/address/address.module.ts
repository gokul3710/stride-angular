import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressesComponent } from './addresses/addresses.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AddressesComponent,
    EditAddressComponent,
    AddAddressComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: AddressesComponent },
      { path: 'add', component: AddAddressComponent },
      { path: 'edit/:id', component: EditAddressComponent }
    ]),
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AddressModule { }
