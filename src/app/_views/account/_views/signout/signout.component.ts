import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {

  public user: User = {} as User;

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
      (userResponse: User) => {
        this.user = userResponse
      }
    )
  }

}
