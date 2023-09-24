import { Component, OnInit } from '@angular/core';
import { UserAccountService } from '../../services/profile/user-account.service';
import { Observable } from 'rxjs';
import { AddressService } from '../../services/address/address.service';
import { addressModel } from 'src/app/core/models/address.model';
import { solid } from 'src/app/core/icons/solid.icons';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {

  //properties
  addresses$!: Observable<addressModel[]>

  //icons
  solid = solid

  constructor(private userAccountService: UserAccountService, private addressService: AddressService) { }

  ngOnInit(): void {
    this.addresses$ = this.addressService.addresses
    this.addressService.addresses.subscribe((re)=>{console.log(re)})
  }

  get default(): addressModel {
    let def = this.addressService.getDefaultAddress()
    return def
  }

  handleEvent(event: any) {
    if (event.action === 'default') {
      this.addressService.setDefaultAddress({ new: event.addressId, current: this.default._id })
    } else if (event.action === 'delete') {
      this.addressService.deleteAddress(event.addressId)
    }
  }
}

