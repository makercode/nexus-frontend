import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { User as FireUser }  from 'firebase/auth';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {

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

}
