import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private http: HttpClient) {}
  title: string = '';
  token: boolean = false;

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
        this.token=true;
      });
  }

  titleAdd() {
    const headers = new HttpHeaders({ Authorization: `${localStorage.getItem('token')}`});
    this.http
      .post(
        'https://expense-tracker-service.herokuapp.com/api/v1/user/transaction/category',
        { title: this.title },
        { headers: headers }
      )
      .subscribe((res) => {
        console.log(res);
      });
  }
}
