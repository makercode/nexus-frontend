import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  public user: User = {} as User;

  constructor(public authService: AuthService) {
    this.observeUser()
  }

  ngOnInit(): void {
  }
  
  observeUser(){
    this.authService.userObserver.subscribe(
      (userResponse: User) => {
        this.user = userResponse
      }
    )
  }

}
