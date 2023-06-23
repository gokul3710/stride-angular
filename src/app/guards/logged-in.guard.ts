import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, flatMap } from 'rxjs';
import { UserAuthService } from '../services/user/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor(private userAuthService: UserAuthService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(window.localStorage.getItem('token')){
        this.router.navigateByUrl('/'); 
        return false
      }else{
        return true;
      }
  }
  
}
