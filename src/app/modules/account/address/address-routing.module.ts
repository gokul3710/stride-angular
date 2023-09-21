import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressesComponent } from './addresses/addresses.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { EditAddressComponent } from './edit-address/edit-address.component';

const routes: Routes = [
  { path: '', component: AddressesComponent },
  { path: 'add', component: AddAddressComponent },
  { path: 'edit/:id', component: EditAddressComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressRoutingModule { }
