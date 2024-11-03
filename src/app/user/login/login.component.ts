import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../../service/common.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{


  loginForm:any
username: any;
password: any;

  constructor(public commonsvc:CommonService){}
  ngOnInit(): void {
    
  }

  checkLogin(login:any) {
    console.log(login.value);
    this.commonsvc.setUser(login.value)
    this.commonsvc.updateName(login.value.username)
  }
}
