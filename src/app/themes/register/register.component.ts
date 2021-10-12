import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('.+@.+\..+'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    rePassword: new FormControl(''),
  });
  onSubmit() {
    this.authService
      .register(
        this.signUpForm.value.userName,
        this.signUpForm.value.password,
        this.signUpForm.value.email
      )
      .subscribe(
        (res) => {
          this.router.navigate(['login']);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  constructor(private router: Router, private authService: AuthService) {
    const isLogged = localStorage.getItem('isLogged');
    if (isLogged === '1') {
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {}
}
