import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private http: HttpClient,
    private auth:AuthService,private router:Router) {}

  loginForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    phoneNumber: new FormControl(''),
  });

  ngOnInit(): void {}

  postBody(): any {
    let postBody = Object.assign({}, this.loginForm.value);
    postBody['name'] = this.loginForm.controls['name'].value;
    postBody['email'] = this.loginForm.controls['email'].value;
    postBody['password'] = this.loginForm.controls['password'].value;
    postBody['phoneNumber'] = this.loginForm.controls['phoneNumber'].value;
    return postBody;
  }

  getToken() {
    this.http
      .post(
        'https://expense-tracker-service.herokuapp.com/api/v1/user/register',
        this.postBody()
      )
      .subscribe((result: any) => {
        console.log(result);
        localStorage.setItem('token',result.token);
        this.auth.isLoggedIn=true;
        this.router.navigate(['addTitle']);
      });
  }

}
