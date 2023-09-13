import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { GoogleSignupComponent } from './pages/google-signup/google-signup.component';
import { LoggedInGuard } from 'src/app/core/guards/logged-in.guard';
import { SigninGuard } from 'src/app/core/guards/signin.guard';
import { GoogleSignupGuard } from 'src/app/core/guards/google-signup.guard';

const routes: Routes = [
  { path: 'signin', component: SigninComponent, canActivate: [LoggedInGuard]},
  { path: 'login', component: LoginComponent, canActivate: [SigninGuard,LoggedInGuard]},
  { path: 'signup', component: SignupComponent, canActivate: [SigninGuard,LoggedInGuard]},
  { path: 'google-signup', component: GoogleSignupComponent , canActivate:[GoogleSignupGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
