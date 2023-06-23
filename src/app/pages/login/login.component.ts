import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../../services/user/user-auth.service';
import { Subscription } from 'rxjs';
import { UserAccountService } from 'src/app/modules/account/services/user-account.service';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  user!: FormGroup
  submitted: boolean = false
  credential!: string
  passwordError!: string

  loginSubscription!: Subscription

  constructor(private router: Router, private formBuilder: FormBuilder,private userAuthService: UserAuthService,private userAccountService: UserAccountService,private loggerService: LoggerService) { }

    ngOnInit(): void {
    this.credential = this.userAuthService.value
    this.user = this.formBuilder.group({
      credential: [this.credential, [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  get r() {
    return this.user.controls
  }

  handleLogin() {
    if(this.user.valid){
      this.loginSubscription = this.userAuthService.loginByCredential(this.user.value).subscribe(
        (response)=>{
          window.localStorage.setItem('token',response.token)
          this.loggerService.clearLogs()
          this.userAccountService.setUser()
          this.router.navigateByUrl('/')
        },
        (error)=>{
          this.passwordError = error.error.message
        }
      )
    }
  }

  ngOnDestroy(){
    this.loginSubscription.unsubscribe()
  }
}
