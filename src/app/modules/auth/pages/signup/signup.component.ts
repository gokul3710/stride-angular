import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { passwordChecker } from 'src/app/core/validators/password-checker';
import { UserAccountService } from 'src/app/modules/account/services/user-account.service';
import { LoggerService } from '../../../../shared/services/logger/logger.service';
import { AuthService } from '../../services/user/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit,OnDestroy {

  //properties
  user!: FormGroup
  submitted: boolean = false
  status!: string 
  otpStatus: boolean = false

  //credentials
  emailCred: string = ''
  phoneCred: string = ''

  //errors
  emailError!: string
  phoneError!: string

  //subscriptions
  signupSubscription!: Subscription


  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService,private userAccountService: UserAccountService,private loggerService: LoggerService) { }

  ngOnInit(): void {

    this.status = this.authService.state 
    this.status === "phone" ? this.phoneCred = this.authService.value : this.phoneCred = ''
    this.status === "email" ? this.emailCred = this.authService.value : this.emailCred = ''

    this.user = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: [this.emailCred, [Validators.required, Validators.email]],
      phone: [this.phoneCred, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      otp: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(4)]],
      gender: ['',Validators.required]
    },
    {
      validators: passwordChecker('password', 'confirmPassword')
    })
  }

  get r() {
    return this.user.controls
  }

  handleSignup() {
    this.submitted = true;
    if(this.user.valid){
      const user = {
        firstName: this.user.value.firstName,
        lastName: this.user.value.lastName,
        email: this.user.value.email,
        phone: this.user.value.phone,
        password: this.user.value.password,
        otp: this.user.value.otp,
        gender: this.user.value.gender
      }
      
      this.signupSubscription = this.authService.signup(user).subscribe(
        (response)=>{
          window.localStorage.setItem('token',response.token)
          this.loggerService.clearLogs()
          this.userAccountService.setUser()
          this.router.navigateByUrl('/')
        },
        (err)=>{
          console.log(err);
          
          if(err?.error?.message?.toLowerCase().includes('email')){
            this.emailError = err?.error?.message
          }else if(err?.error?.message?.toLowerCase().includes('phone')){
            this.phoneError = err?.error?.message
          }else{
            alert(err?.error?.message)
          }
        }
      )
    }
  }

  ngOnDestroy(){
    this.signupSubscription.unsubscribe()
  }
}
