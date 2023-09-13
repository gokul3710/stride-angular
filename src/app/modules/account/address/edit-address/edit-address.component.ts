import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAccountService } from '../../services/user-account.service';
import { AddressService } from '../../services/address.service';
import { addressModel } from 'src/app/core/models/address.model';
import { Subscription } from 'rxjs';
import { solid } from 'src/app/core/icons/solid.icons';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit,OnDestroy {

  //properties
  address!: FormGroup
  submitted: boolean = false
  addressData!: addressModel

  //icons
  solid = solid

  //subscription
  paramSubscription!: Subscription

  constructor(private router: Router, private formBuilder: FormBuilder, private userAccountService: UserAccountService, private route: ActivatedRoute, private addressService: AddressService) { }

  ngOnInit(): void {
    this.paramSubscription = this.route.paramMap.subscribe(
      (params)=>{
        let param = params.get('id')!
        this.addressData = this.addressService.getAddressById(param)
        this.address = this.formBuilder.group({
          name: [this.addressData.name, [Validators.required, Validators.minLength(3)]],
          phone: [this.addressData.phone, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
          street: [this.addressData.street, [Validators.required, Validators.minLength(3)]],
          house: [this.addressData.house, [Validators.required]],
          city: [this.addressData.city, [Validators.required]],
          state: [this.addressData.state, [Validators.required]],
          pincode: [this.addressData.pincode, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
          landmark: [this.addressData.landmark]
        })
      }
    )
  }

  get r() {
    return this.address.controls
  }

  handleSubmitAddress() {
    this.submitted = true;

    if(this.address.valid){
      let address = this.address.value
      address._id = this.addressData._id
      this.addressService.editAddress(address)
    }
  }

  ngOnDestroy(){
    this.paramSubscription.unsubscribe()
  }

}
