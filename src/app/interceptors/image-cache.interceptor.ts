import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor,HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ImageCacheInterceptor implements HttpInterceptor {  

  private cache = new Map<string, HttpResponse<any>>();

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Only cache GET requests for images
    if (request.method === 'GET' && request.url.endsWith('.jpg' || '.png' || '.gif' || '.jpeg')) {
      const cachedResponse = this.cache.get(request.url);
      if (cachedResponse) {
        // Return cached response
        return of(cachedResponse);
      }
      return next.handle(request).pipe(
        tap(event => {
          // Cache response
          if (event instanceof HttpResponse) {
            this.cache.set(request.url, event);
          }
        })
      );
    }
    // For other requests, just pass them through
    return next.handle(request);
  }
}