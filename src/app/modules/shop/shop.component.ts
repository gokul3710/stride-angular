import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { userModel } from 'src/app/models/user.model';
import { UserAccountService } from '../account/services/user-account.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit,OnDestroy {

  user$!: Observable<userModel>

  //subscriptions
  private userSubscription!: Subscription

  constructor(private userAccountService: UserAccountService,private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.user$ = this.userAccountService.user
    }

  }

  ngOnDestroy(): void {
      // this.userSubscription.unsubscribe()
  }

}
