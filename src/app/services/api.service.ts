import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  params: any;
  httpOptions: any;
  constructor(private authService: AuthService, private http: HttpClient) {}

  getQuestions() {
    const API_QUESTIONS_ENDPOINT = 'http://localhost:3000/v1/questions';
    return this.http.get(API_QUESTIONS_ENDPOINT);
  }
}
