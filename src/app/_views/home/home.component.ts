import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { User as FireUser } from 'firebase/auth';
import { UserService } from 'src/app/_services';
import { IUser } from 'src/app/_interfaces/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user: FireUser = {} as FireUser
  public userData: IUser = {} as IUser

  constructor(
    public authService: AuthService, 
    public userService: UserService
  ) {
    this.observeUser()
  }

  ngOnInit(): void {
  }

  async observeUser() {
    this.user = await JSON.parse(localStorage.getItem('user')!)
    console.log("this.user")
    console.log(this.user)
    console.log("this.user.uid");
    console.log(this.user.uid);

    this.userData = await this.userService.getCurrentUserData( this.user.uid )

    console.log("this.userData")
    console.log(this.userData)
    
    this.authService.userObserver.subscribe(
      (userResponse: FireUser) => {
        this.user = userResponse
      }
    )
  }

}
