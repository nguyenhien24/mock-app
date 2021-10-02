import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  params: any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      observe: 'body',
    }),
  };
  constructor(private router: Router, private http: HttpClient) {}

  register(username: string, password: string) {
    const email = 'default@gmail.com';
    const API_REGISTER_ENDPOINT = 'localhost:3000/v1/auth/register';
    this.params = {
      username,
      password,
      email,
    };
    return this.http
      .post<AuthResponse>(API_REGISTER_ENDPOINT, this.params, this.httpOptions)
      .subscribe((AuthResponse) => {
        this.router.navigate(['login']);
      });
  }

  login(username: string, password: string) {
    const API_LOGIN_ENDPOINT = 'http://localhost:3000/v1/auth/login';
    this.params = {
      username,
      password,
    };

    this.http
      .post<AuthResponse>(API_LOGIN_ENDPOINT, this.params, this.httpOptions)
      .subscribe((AuthResponse) => {
        console.log(AuthResponse);
      });
  }
}

export interface AuthResponse {
  user: any;
  tokens: any;
}
