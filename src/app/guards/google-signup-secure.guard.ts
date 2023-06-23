import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../services/user/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleSignupSecureGuard implements CanActivate {

  constructor(private userAuthService: UserAuthService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(window.localStorage.getItem('googleToken')){
        this.router.navigateByUrl('google-signup')
        return false
      }else{
        return true;
      }
  }
}
