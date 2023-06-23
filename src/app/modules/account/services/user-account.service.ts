import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { notificationModel } from 'src/app/models/notification.model';
import { userModel } from 'src/app/models/user.model';
import { LoggerService } from 'src/app/services/logger.service';
import { host } from 'src/environments/environment';
import { Routes } from 'src/environments/routes';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService implements OnDestroy {

  private user$ = new BehaviorSubject<userModel>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    gender: 'Male'
  })

  private state$: BehaviorSubject<'loggedIn' | 'loggedOut'> = new BehaviorSubject('loggedOut')

  private notifications$ : BehaviorSubject<notificationModel[]>

  //Subscriptions
  private userFromTokenSubscription!: Subscription
  private updateImageSubscription!: Subscription
  private changeUsernameSubscription!: Subscription
  private changePhoneSubscription!: Subscription
  private updateDetailsSubscription!: Subscription

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService, private loggerService: LoggerService) { 
    this.userFromToken()
  }

  get user(): Observable<userModel>{
    return this.user$
  }

  setUser(){
    this.userFromToken()
  }

  get state(): Observable<'loggedIn' | 'loggedOut'>{
    return this.state$
  }

  userFromToken(){
    if(localStorage.getItem('token')){
      this.userFromTokenSubscription = this.http.get<userModel>(`${host}${Routes.USER}`).subscribe({
        next: (response) => {
          if(!response){
            this.toastr.warning("Invalid Token")
            localStorage.removeItem('token')
            this.state$.next('loggedOut')
            this.router.navigateByUrl('/signin')
          }else{
            this.user$.next(response)
            this.state$.next('loggedIn')
          }
        },
        error: (err: HttpErrorResponse) => {
          if(err.error.message === "Invalid token"){
            this.toastr.warning(err.error.message)
            localStorage.removeItem('token')
            this.state$.next('loggedOut')
            this.router.navigateByUrl('/signin')
          }else{
            console.log(err.error.message);
          }
        }
      });
    }
  }

  logout(){
    let logs = this.loggerService.getLogs()
    this.http.post(`${host}${Routes.USER_SESSION}`,{logs}).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error);
      }
    });
    let user: userModel = {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      gender: 'Male',
    }
    this.user$.next(user)
    localStorage.removeItem('token')
    this.state$.next('loggedOut')
    this.router.navigateByUrl('')
    this.loggerService.clearLogs()
  }

  updateImage(image: FormData){
    this.updateDetailsSubscription = this.http.patch<{status : 'Done', data: string}>(`${host}${Routes.PROFILE_EDIT_IMAGE}`,image).subscribe({
      next: (response) => {
        let user = this.user$.getValue()
        user.image = response.data
        this.user$.next(user)
        return true
      },
      error: (err) => {
        if (err.error.message === "Invalid token") {
          this.toastr.error("Login To Continue")
          localStorage.removeItem('token')
        } else {
          this.toastr.error(err.error.message)
          console.log('Error fetching orders:', err);
        }
      }
    })
  }

  changeUsername(username: string){
    return this.http.patch<{status : 'Done'}>(`${host}${Routes.PROFILE_EDIT_USERNAME}`,{username})
  }

  changePhone(phone: string){
    return this.http.patch<{status : 'Done'}>(`${host}${Routes.PROFILE_EDIT_PHONE}`,{phone})
  }

  // changeUsername(username: string){
  //   this.changeUsernameSubscription = this.http.post(`${host}/user/profile/edit/username`,{username}).subscribe({
  //     next: (response) => {
  //       let user = this.user$.getValue()
  //       user.username = username
  //       this.user$.next(user)
  //       return true
  //     },
  //     error: (err) => {
  //       if (err.error === "Invalid token") {
  //         this.toastr.error("Login To Continue")
  //         localStorage.removeItem('token')
  //       } else {
  //         this.toastr.error(err.error)
  //         console.log('Error fetching orders:', err);
  //       }
  //     }
  //   })
  // }

  // changePhone(phone: string){
  //   this.changePhoneSubscription = this.http.post(`${host}/user/profile/edit/phone`,{phone}).subscribe({
  //     next: (response) => {
  //       let user = this.user$.getValue()
  //       user.phone = phone
  //       this.user$.next(user)
  //       return true
  //     },
  //     error: (err) => {
  //       if (err.error === "Invalid token") {
  //         this.toastr.error("Login To Continue")
  //         localStorage.removeItem('token')
  //       } else {
  //         this.toastr.error(err.error)
  //         console.log('Error fetching orders:', err);
  //       }
  //     }
  //   })
  // }

  updateDetails(userData: userModel){
    this.http.patch<{status : 'Done'}>(`${host}${Routes.PROFILE_EDIT}`,userData).subscribe({
      next: (response) => {
        let user = this.user$.getValue()
        user.firstName = userData.firstName
        user.lastName = userData.lastName
        this.user$.next(user)
        return true
      },
      error: (err) => {
        if (err.error.message === "Invalid token") {
          this.toastr.error("Login To Continue")
          localStorage.removeItem('token')
        } else {
          this.toastr.error(err.error.message)
          console.log('Error fetching orders:', err);
        }
      }
    })
  }


  changePassword(passwords: any){
    return this.http.patch(`${host}${Routes.PROFILE_EDIT_PASSWORD}`,passwords)
  }



  
  getNotificationsS(){
    return this.http.get<notificationModel[]>(`${host}${Routes.GET_NOTIFICATION}`).subscribe({
      next: (notifications) => {
        this.notifications$.next(notifications)
      },
      error: (err: HttpErrorResponse) => {
        if(err.error.message === "Invalid token"){
          alert(err.error.message);
          localStorage.removeItem('token')
        }else{
          console.log(err.error);
        }
      }
    });
  }

  
  getNotifications(){
    return this.http.get<notificationModel[]>(`${host}${Routes.GET_NOTIFICATION}`,{})
  }

  resetNotifications(){
    return this.http.patch(`${host}${Routes.RESET_NOTIFICATION}`,{})
  }

  clearNotifications(){
    return this.http.patch(`${host}${Routes.CLEAR_NOTIFICATION}`,{})
  }


  ngOnDestroy(){
    this.userFromTokenSubscription.unsubscribe()
    this.updateImageSubscription.unsubscribe()
    this.changeUsernameSubscription.unsubscribe()
    this.changePhoneSubscription.unsubscribe()
    this.updateDetailsSubscription.unsubscribe()
  }
}
