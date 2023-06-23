import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAccountService } from '../../services/user-account.service';
import { AddressService } from '../../services/address.service';
import { solid } from 'src/app/icons/solid.icons';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {

  //properties
  address!: FormGroup
  submitted: boolean = false

  //icons
  solid = solid

  constructor(private router: Router, private formBuilder: FormBuilder, private userAccountService: UserAccountService, private addressService: AddressService) { }

  ngOnInit(): void {
    this.address = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      street: ['', [Validators.required, Validators.minLength(3)]],
      house: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      pincode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      landmark: ['']
    })
  }

  get r() {
    return this.address.controls
  }

  handleSubmitAddress() {
    this.submitted = true;
    if(this.address.valid){
      this.addressService.addNewAddress(this.address.value)
    }
  }
}
