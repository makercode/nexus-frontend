import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user: any;

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
      (userRes) => {
        this.user = JSON.parse(userRes)
        console.log(userRes)
      }
    )
  }

}
