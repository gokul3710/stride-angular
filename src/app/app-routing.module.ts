import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SigninGuard } from './guards/signin.guard';
import { AuthGuard } from './guards/auth.guard';
import { LoggedInGuard } from './guards/logged-in.guard';
import { ShopComponent } from './modules/shop/shop.component';
import { GoogleSignupComponent } from './pages/google-signup/google-signup.component';
import { GoogleSignupGuard } from './guards/google-signup.guard';
import { AccountComponent } from './modules/account/account.component';
import { ProductComponent } from './modules/shop/pages/product/product.component';
import { BrandComponent } from './modules/shop/pages/brand/brand.component';

const routes: Routes = [
  { path: '', component: ShopComponent,  loadChildren: () => import('./modules/shop/shop.module').then(m => m.ShopModule)},
  { path: 'signin', component: SigninComponent, canActivate: [LoggedInGuard]},
  { path: 'login', component: LoginComponent, canActivate: [SigninGuard,LoggedInGuard]},
  { path: 'signup', component: SignupComponent, canActivate: [SigninGuard,LoggedInGuard]},
  { path: 'google-signup', component: GoogleSignupComponent , canActivate:[GoogleSignupGuard]},
  { path: 'account', component: AccountComponent, loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule) , canActivate:[AuthGuard]},
  { path: 'product/:id', component: ProductComponent }, 
  { path: 'brand/:brand', component: BrandComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
