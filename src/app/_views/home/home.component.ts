import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user: any;

  constructor(public authService: AuthService) {
    this.observeUser()
  }

  ngOnInit(): void {
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
