import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../../_services';
import { AlertHelper } from './../../../../shared/alert/alert.helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public authService: AuthService,
    // private alertService: AlertService
  ) {}

  ngOnInit() {}

  signIn(username: string, userpassword: string) {
    this.authService.signIn( username, userpassword );
  }

  googleAuth() {
    this.authService.googleAuth();
  }
  

}
