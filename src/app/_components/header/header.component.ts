import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { User as FireUser }  from 'firebase/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user: FireUser = {} as FireUser;

  constructor(public authService: AuthService) {
    this.observeUser()
  }

  ngOnInit(): void {
  }

  signOut() {
    this.authService.signOut()
  }

  observeUser(){
    this.authService.userObserver.subscribe(
      (userResponse: FireUser) => {
        this.user = userResponse
      }
    )
  }

  sendVerificationEmail() {
    console.log('boom!');
    this.authService.sendVerificationEmail()
  }

}
