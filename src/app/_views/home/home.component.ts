import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { User as FireUser } from 'firebase/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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

}
