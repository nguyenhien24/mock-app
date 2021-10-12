import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  params: any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      observe: 'body', // gui data qua body(postman)
    }),
  };
  private componentMethodCallSource = new Subject<any>();
  componentMethodCalled$ = this.componentMethodCallSource.asObservable();

  constructor(private router: Router, private http: HttpClient) {}

  register(username: string, password: string, userEmail: string) {
    const email = 'default@gmail.com';
    const API_REGISTER_ENDPOINT = 'http://localhost:3000/v1/auth/register';
    this.params = {
      username,
      password,
      userEmail,
    };
    return this.http.post(API_REGISTER_ENDPOINT, this.params);
  }

  login(username: string, password: string) {
    const API_LOGIN_ENDPOINT = 'http://localhost:3000/v1/auth/login';
    this.params = {
      username,
      password,
    };

    return this.http.post(API_LOGIN_ENDPOINT, this.params);
  }

  refreshToken(refreshToken: string) {
    const API_REFRESH_TOKEN_ENDPOINT =
      'http://localhost:3000/v1/auth/refresh-tokens';
    this.params = {
      refreshToken,
    };

    return this.http.post(
      API_REFRESH_TOKEN_ENDPOINT,
      this.params,
      // this.httpOptions
    );
  }

  getAccessToken() {
    if (localStorage.getItem('access_token') === null) {
      //trong th chua login thi k cos access token
      return;
    }
    return JSON.parse(localStorage.getItem('access_token') ?? '');
  }

  getRefreshToken() {
    if (localStorage.getItem('refresh_token') === null) {
      //trong th chua login thi k cos refresh token
      return;
    }
    return JSON.parse(localStorage.getItem('refresh_token') ?? '');
  }
}
