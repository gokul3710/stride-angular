import { ServiceWorkerModule } from '@angular/service-worker';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {   HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import * as environment from '../environments/environment'

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { ScrollResetDirective } from './core/directives/scroll-reset.directive';
import { AccountModule } from './modules/account/account.module';
import { ShopModule } from './modules/shop/shop.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageCacheInterceptor } from './core/interceptors/image-cache.interceptor';
import { UserAuthInterceptor } from './core/interceptors/user-auth.interceptor';
import { HomeLoaderComponent } from './shared/components/home-loader/home-loader.component';
import { AuthModule } from '@angular/fire/auth';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    ScrollResetDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AccountModule,
    ShopModule,
    AuthModule,
    SharedModule,
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
