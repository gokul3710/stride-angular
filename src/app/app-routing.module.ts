import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { ShopComponent } from './modules/shop/shop.component';
import { ProductComponent } from './modules/shop/pages/product/product.component';
import { BrandComponent } from './modules/shop/pages/brand/brand.component';

const routes: Routes = [
  { path: '', component: ShopComponent,  loadChildren: () => import('./modules/shop/shop.module').then(m => m.ShopModule)},
  { path: 'auth',  loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)},
  { path: 'account',loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule) , canActivate:[AuthGuard]},
  { path: 'product/:id', component: ProductComponent }, 
  { path: 'brand/:brand', component: BrandComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
