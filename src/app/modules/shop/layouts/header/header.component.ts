import { Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { host } from 'src/environments/environment';
import { ProductService } from '../../services/product.service';
import { userModel } from 'src/app/core/models/user.model';
import { Observable, Subscription } from 'rxjs';
import { regular } from 'src/app/core/icons/regular.icons';
import { solid } from 'src/app/core/icons/solid.icons';
import { CartService } from 'src/app/modules/account/services/cart.service';
import { UserAccountService } from 'src/app/modules/account/services/user-account.service';
import { notificationModel } from 'src/app/core/models/notification.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //icons
  solid = solid
  regular = regular

  //user
  user: userModel

  state: 'loggedIn' | 'loggedOut' 

  //Nav Menu State
  @ViewChild('navMenu', { static: false }) navMenu!: ElementRef<HTMLDivElement>;
  navState: boolean = false


  //cart
  cartCount$!: Observable<number>

  //notfication
  notificationState: boolean = false
  body!: HTMLBodyElement
  newNotifications!: number
  notifications: notificationModel[]

  //subscriptions
  resetNotificationsSubscription!: Subscription


  constructor(private renderer: Renderer2, private router: Router, private productService: ProductService,private cartService: CartService, private userAccountService: UserAccountService) { }

  ngOnInit(): void {
    this.body = this.renderer.selectRootElement('body', true);
    this.cartCount$ = this.cartService.cartCount
    this.userAccountService.user.subscribe(
      (user)=>{
          this.user = user
      }
    )
    this.userAccountService.state.subscribe(
      (state)=>{
          this.state = state
      }
    )
  }

  navLinksToggler() {
    this.navMenu!.nativeElement.classList.toggle('nav-menu-open')
    this.navState = !this.navState
  }

  navLinksClose() {
    this.navMenu!.nativeElement.classList.remove('nav-menu-open')
    this.navState = false
  }

  getUserImage() {
    if ((this.user?.image as string).includes('http')) {
      return this.user?.image
    } else {
      return `${host}/image/${this.user?.image}`
    }
  }

  @HostListener('window', ['$event'])
  onWindowClicked() {
    this.navMenu!.nativeElement.classList.toggle('nav-menu-open')
    this.navState = false
  }

  openNotifications() {
    this.newNotifications = this.user.notifications
    this.userAccountService.getNotifications().subscribe(
      (notifications) => {
        if(this.user?.notificationCleared){
          this.notifications = notifications
          this.notifications = this.notifications.filter((notification)=>{
            return new Date(notification.date) > new Date(this.user.notificationCleared)
          })
        }else{
          this.notifications = notifications
        }
      }
    )

    if (!this.notificationState) {
      if (this.user.notifications) {
        this.userAccountService.resetNotifications().subscribe(
          (response) => {
            setTimeout(() => {
              this.notificationState = true
              this.user.notifications = 0
              this.body.style.overflow = 'hidden'
            }, 500);
          }
        )
      } else {
        setTimeout(() => {
          this.notificationState = true
          this.body.style.overflow = 'hidden'

        }, 500);
      }
    }
  }

  closeNotifications() {
    if (this.notificationState) {
      this.notificationState = false
      this.body.style.overflow = 'scroll'
    }
  }

  handleClearNotifications() {
    this.userAccountService.clearNotifications().subscribe(
      (response) => {
        this.notificationState = true
        this.notifications = []
      }
    )
  }

  // ngOnDestroy(){
  //   this.resetNotificationsSubscription.unsubscribe()
  // }

}