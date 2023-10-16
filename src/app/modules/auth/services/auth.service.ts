import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, User } from '@angular/fire/auth';
import { userModel } from 'src/app/core/models/user.model';
import { Routes } from 'src/environments/routes';
import { host } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  state!: "email" | "phone" | "username"
  value!: string

  constructor(private http: HttpClient, private fireAuth:AngularFireAuth) { }

  signinByCredential(credential: string) {
    this.value = credential
    return this.http.post<{state: "email" | "phone" | "username",response: 'login' | 'signup' }>(`${host}${Routes.USER_SIGNIN}`, { credential })
  }

  loginByCredential(userData: { credential: string, password: string }) {
    return this.http.post<{token: string}>(`${host}${Routes.USER_LOGIN}`, userData)
  }

  async loginByGoogle() {
    let response: {user: User} = await this.fireAuth.signInWithPopup(new GoogleAuthProvider())
    return this.http.post<{token: string, state: 'login' | 'signup'}>(`${host}${Routes.USER_SIGNIN_GOOGLE}`, response.user)
  }

  signup(user: userModel) {
    return this.http.post<{token: string}>(`${host}${Routes.USER_SIGNUP}`, user)
  }

  signupByGoogle(user: { phone: any; password: any; gender: 'Male' | 'Female'; }){
    return this.http.post<{token: string}>(`${host}${Routes.USER_SIGNUP_GOOGLE}`, user)
  }

}
