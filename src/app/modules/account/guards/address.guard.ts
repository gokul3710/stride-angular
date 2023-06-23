import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AddressService } from '../services/address.service';

@Injectable({
  providedIn: 'root'
})
export class AddressGuard implements CanActivate {
  constructor(private addressService: AddressService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.addressService.getAddresses()){
      return true
    }else{
      this.router.navigateByUrl('/account/address')
      return false
    }
  }
  
}
