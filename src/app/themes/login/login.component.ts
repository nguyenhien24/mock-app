import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginFail = false;
  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(private router: Router, private apiService: APIService) {
    // console.log('gg', user);
    const isLogged = localStorage.getItem('isLogged');
    if (isLogged === '1') {
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log('call onSubmit');
    this.apiService.login('tuandoan2', 'tuandoan2604');
    // const user = JSON.parse(localStorage.getItem('user') ?? '');
    // console.log(this.loginForm.value, user);
    // if (
    //   this.loginForm.value.userName === user.userName &&
    //   this.loginForm.value.password === user.password
    // ) {
    //   localStorage.setItem('isLogged', '1');
    //   this.router.navigate(['']);
    // } else {
    //   this.loginFail = true;
    // }
  }
}
