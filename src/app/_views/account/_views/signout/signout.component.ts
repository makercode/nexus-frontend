import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth/auth.service';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {

  public user: any;

  constructor(public authService: AuthService) {
    this.observeUser()
  }

  ngOnInit(): void {
    this.signOut()
  }

  signOut() {
    this.authService.signOut()
  }

  observeUser(){
    this.authService.userObserver.subscribe(
      (userRes) => {
        this.user = JSON.parse(userRes)
        console.log(userRes)
      }
    )
  }

}
