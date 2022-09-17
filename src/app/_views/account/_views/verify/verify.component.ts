import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services';
import { User as FireUser } from 'firebase/auth';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  public user: FireUser = {} as FireUser;

  constructor(public authService: AuthService) {
    this.observeUser()
  }

  ngOnInit(): void {
  }
  
  observeUser(){
    this.authService.userObserver.subscribe(
      (userResponse: FireUser) => {
        this.user = userResponse
      }
    )
  }

  reloadUser() {
    console.log("reload")
    this.authService.reloadCurrentUser();
  }

  sendVerificationEmail() {
    console.log('sendVerificationEmail');
    this.authService.sendVerificationEmail()
  }

}
