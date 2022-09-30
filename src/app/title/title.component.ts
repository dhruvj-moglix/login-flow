import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  constructor(private http :HttpClient,private auth :AuthService) { }

  ngOnInit(): void {
  }
  title:String='';

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
  logout(){
    this.auth.logout();
  }
}
