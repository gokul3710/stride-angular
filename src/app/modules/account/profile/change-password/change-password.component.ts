import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAccountService } from '../../services/profile/user-account.service';
import { passwordChecker } from 'src/app/core/validators/password-checker';
import { Subscription } from 'rxjs';
import { solid } from 'src/app/core/icons/solid.icons';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit,OnDestroy {

  //icons
  solid = solid

  //properties
  user!: FormGroup
  submitted: boolean = false

  changePasswordSubscription! : Subscription


  constructor(private router: Router, private formBuilder: FormBuilder, private userAccountService: UserAccountService) { }

  ngOnInit(): void {

    this.user = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    },
      {
        validators: passwordChecker('newPassword', 'confirmPassword')
      })
  }

  get r() {
    return this.user.controls
  }

  handleSignup() {
    this.submitted = true;
    if (this.user.valid) {
      const password = {
        password: this.user.value.password,
        newPassword: this.user.value.newPassword
      }
      this.changePasswordSubscription = this.userAccountService.changePassword(password).subscribe(
        (response) => {
          this.router.navigateByUrl('/account')
        },
        (err) => {
          console.log(err.error)
        }
      )
    }
  }

  ngOnDestroy(){
    // this.changePasswordSubscription.unsubscribe()
  }
}
