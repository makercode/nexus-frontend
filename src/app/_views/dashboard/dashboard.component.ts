import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, take, debounceTime } from 'rxjs';

import { AuthService, UserService } from '../../_services';

import { SlugifyPipe } from '../../_pipes/slugify.pipe';
import { User as IFireUser } from 'firebase/auth';
import { IUser } from 'src/app/_interfaces/user.interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [SlugifyPipe]
})

export class DashboardComponent implements OnInit {

  @ViewChild('shadowWidth', {static: false}) shadowWidth: ElementRef | undefined;
  
  constructor(
     public authService: AuthService,
     public userService: UserService,
     private slugifyPipe: SlugifyPipe,
     private afStore: AngularFirestore
  ) { 
    this.observeUser()
    console.log("('user')")
    console.log(JSON.parse(localStorage.getItem('user')!))
  }

  width: number = 20

  // Check for allow edit subdomain
  editableSubdomain: boolean = false
  user: IFireUser = {} as IFireUser
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

  async observeUser() {
    let userUid = JSON.parse(localStorage.getItem('user')!).uid
    this.userService.getCurrentUserData( userUid ).then(
      (resUser) => {
        this.userData = resUser
        console.log(this.userData)
      }
    )
  }
  
  ngOnInit(): void {
    
    this.watcher()
  }

  onBusinessChange() {
    this.userForm.controls['subdomain'].setValue( this.slugify(this.business.value) )
    this.resizeSubdomainInput()
  }

  slugify(input: string) {
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

    this.resizeSubdomainInput()
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

  resizeSubdomainInput() {
    this.width = Math.max( this.shadowWidth!.nativeElement.offsetWidth + 6 )
  }

  watcher() {

    let isTaken = true

    let suscription
    
    let inputSubdomain = this.subdomain.valueChanges.pipe(
      debounceTime(500)
    )

    // when input change
    inputSubdomain.subscribe(subdomain => {
      suscription = this.afStore.doc(`subdomains/${subdomain}`).get()
      suscription.subscribe((subdomain) => {
        console.log( subdomain.exists )
        isTaken = subdomain.exists
      })
    })

  }

  /*
  subdomainTaken (afs: AngularFirestore) {
    console.log("subdomainTaken")
    return async (control: AbstractControl) =>  {
      return {subdomainAvailable: false}

      let isTaken = afs.collection('subdomains', (ref:any) => ref.where('subdomain','==', subdomain))
      .valueChanges().pipe(
        debounceTime(2000),
        take(1),
        map(arr => arr.length ? { subdomainAvailable: false }: null)
      )
      isTaken.subscribe(res => {
        console.log(res)
      })
      return isTaken
    }
  }
  */

}
