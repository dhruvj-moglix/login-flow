import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn = false;

  constructor(private router: Router) {
    if (localStorage['token']) {
      const check = JSON.parse(
        window.atob(localStorage['token'].split('.')[1])
      );
      console.log('check', check);
      if (check >= Date.now() * 1000) {
        this.router.navigate(['login']);
        return;
      }
      this.isLoggedIn = true;
      router.navigate(['addTitle']);
    }
  }

  logout() {
    localStorage.clear();
    this.isLoggedIn = false;
    this.router.navigate(['login']);
  }
}
