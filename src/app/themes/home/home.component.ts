import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {
    const isLogged = localStorage.getItem('isLogged');
    if (isLogged !== '1') {
      this.router.navigate(['login']);
    }
  }

  ngOnInit(): void {}
}
