import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SlugifyPipe } from '../../_pipes/slugify.pipe'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [SlugifyPipe]
})

export class DashboardComponent implements OnInit {

  constructor(
     public authService: AuthService,
     private slugifyPipe: SlugifyPipe
    ) { }

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
    ]),
    ruc: new FormControl( '', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(7),
      Validators.maxLength(12),
    ]),
  });

  ngOnInit(): void {
  }

  slugify(input: string){
    // this.subdomain = this.slugifyPipe.transform(input)
    return this.slugifyPipe.transform(input)
  }
  sendUserInfo() {
    console.log('sending')
  }

}
