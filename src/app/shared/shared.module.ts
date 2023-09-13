import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetMRPPipe } from './pipes/get-mrp.pipe';
import { GetTaxPipe } from './pipes/get-tax.pipe';
import { HomeLoaderComponent } from './components/home-loader/home-loader.component';

@NgModule({
  declarations: [
    GetMRPPipe,
    GetTaxPipe,
    HomeLoaderComponent,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    GetMRPPipe,
    GetTaxPipe,
    HomeLoaderComponent,
  ],
})
export class SharedModule { }
