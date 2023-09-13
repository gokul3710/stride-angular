import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { passwordChecker } from 'src/app/core/validators/password-checker';
import { UserAccountService } from 'src/app/modules/account/services/user-account.service';
import { LoggerService } from '../../../../shared/services/logger/logger.service';
import { AuthService } from '../../services/user/auth.service';

@Component({
  selector: 'app-google-signup',
  templateUrl: './google-signup.component.html',
  styleUrls: ['./google-signup.component.css']
})
export class GoogleSignupComponent implements OnInit,OnDestroy {

  user!: FormGroup
  submitted: boolean = false
  phoneError!: string
  

  authSubscription!: Subscription


  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService,private userAccountService: UserAccountService,private loggerService: LoggerService) { }
 
  ngOnInit(): void {
    this.user = this.formBuilder.group({
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      gender: ['',Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    },
      {
        validators: passwordChecker('password', 'confirmPassword')
      })
  }

  get r() {
    return this.user.controls
  }

  handleGoogleSignup() {
    this.submitted = true;
    if(this.user.valid){
      const user = {
        phone: this.user.value.phone,
        password: this.user.value.password,
        gender: this.user.value.gender
      }
      this.authSubscription = this.authService.signupByGoogle(user).subscribe(
        (response)=>{
          window.localStorage.setItem('token',response.token)
          localStorage.removeItem('googleAuthToken')
          this.loggerService.clearLogs()
          this.userAccountService.setUser()
          this.router.navigateByUrl('/')
        },
        (err: HttpErrorResponse)=>{
          if(err?.error?.message.toLowerCase().includes('phone')){
            this.phoneError = err.error
          }else if(err?.error?.message === "Invalid token"){
            localStorage.removeItem('googleAuthToken')
            alert("Token Expired")
            this.router.navigateByUrl('/signin')
          }else{
            console.log(err.error.message);            
          }
        }
      )
    }
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe()
  }


}
