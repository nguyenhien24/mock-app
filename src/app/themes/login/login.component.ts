import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit() {
    // console.log('call onSubmit');
    this.authService
      .login(this.loginForm.value.userName, this.loginForm.value.password)
      .subscribe(
        (res: any) => {
          localStorage.setItem(
            'access_token',
            JSON.stringify(res.tokens.access.token)
          ); //res.tokens trả về là 1 obj nhưng localStorage chỉ lưu đc dưới dạng string nên phải encode obj thành json
          localStorage.setItem(
            'refresh_token',
            JSON.stringify(res.tokens.refresh.token)
          );
          console.log('login success');
          this.router.navigate(['/question']);
        },
        (err) => {
          this.loginFail = true;
        }
      );
  }
}
