import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  constructor( public authService: AuthService ) { }

  ngOnInit(): void {
  }
  
}
