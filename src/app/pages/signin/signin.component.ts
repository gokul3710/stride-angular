import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { credentialChecker } from 'src/app/custom-validators/credential-check';
import { UserAccountService } from 'src/app/modules/account/services/user-account.service';
import { LoggerService } from 'src/app/services/logger.service';
import { UserAuthService } from 'src/app/services/user/user-auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit,OnDestroy {

  //properties
  user!: FormGroup
  submitted: boolean = false
  credentialError = ''


  //subscriptions
  signinSubscription!: Subscription
  signinGoogleSubscription!: Subscription


  constructor(
    private router: Router, 
    private formBuilder: FormBuilder,
    private userAuthService: UserAuthService,
    private userAccountService: UserAccountService,
    private loggerService: LoggerService
  ) { }

  ngOnInit(): void {
    this.user = this.formBuilder.group({
      credential: ['', [Validators.required]],
    },
    {
      validators: credentialChecker('credential')
    })
  }

  get r() {
    return this.user.controls
  }

  handleSignin() {
    if (this.user.valid) {
      this.signinSubscription = this.userAuthService.signinByCredential(this.user.value.credential)?.subscribe(
        (response)=>{
          if(response.response === 'signup'){
            this.credentialError = `${response.state} is not registered`
          }else{
            this.userAuthService.state = response.state
            this.router.navigateByUrl(response.response)
          }
        }
      )
    }
  }

  async handleGoogleLogin(){
    this.signinGoogleSubscription = (await this.userAuthService.loginByGoogle()).subscribe(
      (response: any)=>{
        if(response.state === 'login'){
          localStorage.setItem('token', response.token)
          this.userAccountService.setUser()
          this.loggerService.clearLogs()
          this.router.navigateByUrl('/')
        }else if(response.state === 'signup'){
          localStorage.setItem('googleAuthToken',response.token)
          this.router.navigateByUrl('google-signup')
        }
      },
      (err)=>{
        console.log(err.error);
      }
    )
  }

  ngOnDestroy(){
    // this.signinGoogleSubscription.unsubscribe()
    // this.signinSubscription.unsubscribe()
  }
}
