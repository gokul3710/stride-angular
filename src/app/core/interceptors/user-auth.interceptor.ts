import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { host } from 'src/environments/environment';
import { Routes } from 'src/environments/routes';

@Injectable()
export class UserAuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(request.method === 'POST' && request.url.endsWith(Routes.USER_SIGNUP_GOOGLE)){
      
      const headers = new HttpHeaders()
      .set('Authorization', 'Bearer '+ localStorage.getItem('googleAuthToken'));

      const authReq = request.clone({
        headers: headers
      });

      return next.handle(authReq)
    }
  
    // Add the headers to all other requests
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer '+ localStorage.getItem('token'));
  
    const authReq = request.clone({
      headers: headers
    });
  
    return next.handle(authReq);
  }
  
}
