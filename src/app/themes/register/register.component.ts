import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  signUpForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    rePassword: new FormControl(''),
  });
  onSubmit() {
    this.apiService.register(
      this.signUpForm.value.userName,
      this.signUpForm.value.password
    );
  }

  constructor(private router: Router, private apiService: APIService) {
    const isLogged = localStorage.getItem('isLogged');
    if (isLogged === '1') {
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {}
}
