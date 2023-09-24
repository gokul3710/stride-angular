import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { addressModel } from 'src/app/core/models/address.model';
import { host } from 'src/environments/environment';
import { Routes } from 'src/environments/routes';


@Injectable()
export class AddressService implements OnDestroy {

  private addresses$ = new BehaviorSubject<addressModel[]>([])

  //subscriptions

  private getAddressSubscription!: Subscription
  private addNewAddressSubscription!: Subscription
  private deleteAddressSubscription!: Subscription
  private editAddressSubscription!: Subscription
  private setDefaultAddressSubscription!: Subscription

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { 
    this.fetchAddresses()
  }

  fetchAddresses(){
    this.getAddressSubscription = this.http.get<{addresses:addressModel[]}>(`${host}${Routes.GET_ADDRESS}`).subscribe({
      next: (response) => {
        this.addresses$.next(response.addresses);
      },
      error: (err) => {
        this.toastr.error(err.error.message)
        console.log('Error fetching addresses:', err);
      }
    });
  }

  get addresses(): Observable<addressModel[]> {
    return this.addresses$;
  }

  addNewAddress(address: addressModel , props?: any) {
    this.addNewAddressSubscription = this.http.post(`${host}${Routes.ADD_ADDRESS}`, address).subscribe({
      next: (response:{response: string}) => {
        
        let addresses = this.addresses$.getValue()
        address._id = response.response
        if(addresses.length){
          addresses = [...addresses, address]
        }else{
          address.default = true
          addresses = [address]
        }
        
        this.addresses$.next(addresses)
        if(!props || !props?.checkout){
          this.router.navigateByUrl('/account/address')
        }
      },
      error: (err) => {
        this.toastr.error(err.error.message)
        console.log('Error adding address:', err);
      }
    })
  }

  getAddressById(addressId: string): addressModel{
    let addresses = this.addresses$.getValue()
    return addresses.find((address: addressModel) => address._id === addressId)!
  }

  getDefaultAddress(): addressModel{
    let addresses = this.addresses$.getValue()
    return addresses.find((address: addressModel) => address.default )!
  }

  setDefaultAddress(addressIds: {new: string, current: string}){
    this.setDefaultAddressSubscription = this.http.patch(`${host}${Routes.SET_DEFAULT_ADDRESS}`,addressIds).subscribe({
      next: (response) => {
        let addresses = this.addresses$.getValue()
        addresses = addresses.map((address) => {
          if(address._id === addressIds.new){
            address.default = true
          }
          if(address._id === addressIds.current){
            address.default = false
          }
          return address
        })
        this.addresses$.next(addresses)
      },
      error: (err) => {
        this.toastr.error(err.error.message)
        console.log('Error setting address to default:', err);
      }
    })
  }

  deleteAddress(addressId: string) {
    this.deleteAddressSubscription = this.http.delete(`${host}${Routes.DELETE_ADDRESS}/${addressId}`).subscribe({
      next: (response) => {
        let addresses = this.addresses$.getValue()
        addresses = addresses.filter(address => address._id !== addressId)
        this.addresses$.next(addresses)
      },
      error: (err) => {
        this.toastr.error(err.error.message)
        console.log('Error deleting address:', err);
      }
    })
  }

  editAddress(addressData: addressModel) {
    this.editAddressSubscription = this.http.patch(`${host}${Routes.EDIT_ADDRESS}`, addressData).subscribe({
      next: (response) => {
        let addresses = this.addresses$.getValue()
        addresses = addresses.map((address) => {
          if (addressData._id === address._id) {
            return addressData
          }
          return address
        })
        this.addresses$.next(addresses)
        this.router.navigateByUrl('/account/address')
      },
      error: (err) => {
        this.toastr.error(err.error.message)
        console.log('Error editing address:', err);
      }
    })
  }

  ngOnDestroy(){
    this.getAddressSubscription.unsubscribe()
    this.addNewAddressSubscription.unsubscribe()
    this.deleteAddressSubscription.unsubscribe()
    this.editAddressSubscription.unsubscribe()
    this.setDefaultAddressSubscription.unsubscribe()
  }

}
