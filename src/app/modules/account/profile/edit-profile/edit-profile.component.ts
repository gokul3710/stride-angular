import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAccountService } from '../../services/user-account.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { host } from 'src/environments/environment'
import { userModel } from 'src/app/core/models/user.model';
import { Subscription } from 'rxjs';
import { solid } from 'src/app/core/icons/solid.icons';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit,OnDestroy {

  //icons
  solid = solid

  //form
  user!: FormGroup
  submitted: boolean = false

  //userFromToken
  userData!: userModel | null

  //submitErrors
  emailError!: string
  phoneError!: string
  usernameError!: string


  //profile image
  @ViewChild('imageInput') imageInput!: ElementRef<HTMLInputElement>
  @ViewChild('image') image!: ElementRef<HTMLInputElement>
  @ViewChild('imageEdit') imageEdit!: ElementRef<HTMLInputElement>

  //username
  @ViewChild('username') username!: ElementRef<HTMLInputElement>
  @ViewChild('usernameEdit') usernameEdit!: ElementRef<HTMLAnchorElement>
  @ViewChild('usernameSubmit') usernameSubmit!: ElementRef<HTMLAnchorElement>


  //phone
  @ViewChild('phone') phone!: ElementRef<HTMLInputElement>
  @ViewChild('phoneEdit') phoneEdit!: ElementRef<HTMLAnchorElement>
  @ViewChild('phoneSubmit') phoneSubmit!: ElementRef<HTMLAnchorElement>


  //profile image crop
  imageChangedEvent: any
  croppedImage: any = '';
  imageChange: boolean = false

  //subscriptions
  changePhoneSubscription!: Subscription
  changeUsernameSubscription!: Subscription
  userSubscription!: Subscription

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userAccountService: UserAccountService
  ) { }

  ngOnInit(): void {
    this.userSubscription = this.userAccountService.user.subscribe(
      (response) => {
        this.userData = response
        this.user = this.formBuilder.group({
          firstName: [this.userData?.firstName, [Validators.required, Validators.minLength(3)]],
          lastName: [this.userData?.lastName, [Validators.required, Validators.minLength(3)]],
          username: [this.userData?.username, [Validators.required]],
          email: [this.userData?.email, [Validators.required, Validators.email]],
          phone: [this.userData?.phone, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        })
        this.getUserImage()
      }
    )
  }

  get r() {
    return this.user.controls
  }

  getUserImage() {
    if ((this.userData?.image as string).includes('http')) {
      this.croppedImage = this.userData?.image
    } else {
      this.croppedImage = `${host}/image/${this.userData?.image}`
    }
  }

  changeImage() {
    this.imageInput.nativeElement.click()
  }

  handleImageSubmit(event: any) {
    this.imageChangedEvent = event;
    this.imageChange = true
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  imageLoaded() {
    // show cropper
  }

  loadImageFailed() {
    // show message
  }

  async DataURIToBlob(dataURI: any) {
    const response = await fetch(dataURI);
    const blob = await response.blob();
    return blob;
  }

  async saveCroppedImage() {
    const file = await this.DataURIToBlob(this.croppedImage)
    const formData = new FormData();
    formData.append('image', file, 'profile')
    this.userAccountService.updateImage(formData)
    this.imageChange = false
  }

  imageCropModalClose() {
    this.imageChange = false
    this.getUserImage()
  }

  usernameChange() {
    this.usernameEdit.nativeElement.style.display = "none"
    this.username.nativeElement.readOnly = false
    this.usernameSubmit.nativeElement.style.display = "grid"
  }

  usernameChangeSubmit() {
    this.changeUsernameSubscription = this.userAccountService.changeUsername(this.user.value.username).subscribe(
      (response: any) => {
        this.usernameSubmit.nativeElement.style.display = "none"
        this.usernameEdit.nativeElement.style.display = "grid"
        this.username.nativeElement.readOnly = true
        this.userData!.username = this.user.value.username
      },
      (err) => {
        this.usernameError = err.error.message
      }
    )
  }

  phoneChange() {
    this.phoneEdit.nativeElement.style.display = "none"
    this.phone.nativeElement.readOnly = false
    this.phoneSubmit.nativeElement.style.display = "grid"
  }

  phoneChangeSubmit() {
    this.changePhoneSubscription = this.userAccountService.changePhone(this.user.value.phone).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token)
        this.phoneSubmit.nativeElement.style.display = "none"
        this.phoneEdit.nativeElement.style.display = "grid"
        this.phone.nativeElement.readOnly = true
        this.userData!.phone = this.user.value.phone
      },
      (err) => {
        this.phoneError = err.error.message
      }
    )
  }

  updateDetails() {
    this.submitted = true
    if (this.user.valid) {
      this.userAccountService.updateDetails(this.user.value)
      this.router.navigateByUrl('/account')
    }
  }

  ngOnDestroy(){
    // this.changePhoneSubscription.unsubscribe()
    // this.changeUsernameSubscription.unsubscribe()
    // this.userSubscription.unsubscribe()
  }
}

