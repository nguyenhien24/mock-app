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
    // console.log('call onSubmit');
    this.apiService
      .login(this.loginForm.value.userName, this.loginForm.value.password)
      .subscribe(
        (res: any) => {
          localStorage.setItem(
            'access_token',
            JSON.stringify(res.tokens.access)
          ); //res.tokens trả về là 1 obj nhưng localStorage chỉ lưu đc dưới dạng string nên phải encode obj thành json
          this.router.navigate(['/question']);
        },
        (err) => {
          this.loginFail = true;
        }
      );
    const user = JSON.parse(localStorage.getItem('user') ?? '');
  }
}
