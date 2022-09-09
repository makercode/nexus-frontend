import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

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
