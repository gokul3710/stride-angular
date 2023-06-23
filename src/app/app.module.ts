import { ServiceWorkerModule } from '@angular/service-worker';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {   HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { SigninComponent } from './pages/signin/signin.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import * as environment from '../environments/environment'

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { GoogleSignupComponent } from './pages/google-signup/google-signup.component';
import { ScrollResetDirective } from './directives/scroll-reset.directive';
import { AccountModule } from './modules/account/account.module';
import { ShopModule } from './modules/shop/shop.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageCacheInterceptor } from './interceptors/image-cache.interceptor';
import { UserAuthInterceptor } from './interceptors/user-auth.interceptor';
import { HomeLoaderComponent } from './components/home-loader/home-loader.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SigninComponent,
    GoogleSignupComponent,
    ScrollResetDirective,
    HomeLoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AccountModule,
    ShopModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js')
  ],
  providers: [
    UserAuthInterceptor,
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: UserAuthInterceptor,
      multi: true
    },
    ImageCacheInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ImageCacheInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
