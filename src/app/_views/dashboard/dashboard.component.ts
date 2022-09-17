import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { AuthService, UserService } from '../../_services';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SlugifyPipe } from '../../_pipes/slugify.pipe';
import { User as FireUser } from 'firebase/auth';
import { IUser } from 'src/app/_interfaces/user.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [SlugifyPipe]
})

export class DashboardComponent implements OnInit {

  constructor(
     public authService: AuthService,
     public userService: UserService,
     private slugifyPipe: SlugifyPipe
  ) { 
    this.observeUser()
    console.log("('user')")
    console.log(JSON.parse(localStorage.getItem('user')!))
  }

  // Check for allow edit subdomain
  editableSubdomain: boolean = false
  user: FireUser = {} as FireUser
  userData: IUser = {} as IUser

  get name() { return this.userForm.get('name')! }
  get business() { return this.userForm.get('business')! }
  get subdomain() { return this.userForm.get('subdomain')! }
  get ruc() { return this.userForm.get('ruc')! }

  userForm: FormGroup = new FormGroup({
    name: new FormControl( '', [
      Validators.required,
      Validators.minLength(2),
    ]),
    business: new FormControl( '', [
      Validators.required,
      Validators.minLength(4),
    ]),
    subdomain: new FormControl( '', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(24),
    ]),
    ruc: new FormControl( '', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(7),
      Validators.maxLength(12),
    ]),
  });

  
  async observeUser(){
    let userUid = JSON.parse(localStorage.getItem('user')!).uid
    this.userService.getCurrentUserData( userUid ).then(
      (resUser) => {
        this.userData = resUser
        console.log(this.userData)
      }
    )
  }
  

  ngOnInit(): void {
  }

  onBusinessChange() {
    this.userForm.controls['subdomain'].setValue( this.slugify(this.business.value) )
  }

  slugify(input: string){
    // this.subdomain = this.slugifyPipe.transform(input)
    return this.slugifyPipe.transform(input)
  }

  keyPressAlphaNumeric(event:KeyboardEvent) {
    var inp = String.fromCharCode(event.keyCode)
    console.log(inp)
    if (/[a-zA-Z0-9]/.test(inp)) {
      return true;
    }
    else if (inp=='-') {
      return true
    } else {
      event.preventDefault()
      return false;
    }
  }

  onSubdomainChange() {
    let textSubdomain = this.slugify(this.subdomain.value)
    this.userForm.controls['subdomain'].setValue( textSubdomain )
  }

  allowEditableSubdomain() {
    this.editableSubdomain = true
  }
  
  async sendUserAndDomainInfo() {
    const currentUser = await this.authService.getCurrentUser()
    if( currentUser&&currentUser.email) {
      this.userService.writteUserAndDomainDBData(
        currentUser.uid,
        currentUser.email,
        this.name.value,
        this.business.value,
        this.subdomain.value,
        this.ruc.value
      )
    }
  }

}
