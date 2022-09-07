import {
  Component,
  Input,
  OnChanges,
  SimpleChange,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-password-checker',
  templateUrl: './password-checker.component.html',
  styleUrls: ['./password-checker.component.css']
})

export class PasswordCheckerComponent implements OnChanges {

  @Input() public passwordToVerify!: string
  @Output() passwordStrength = new EventEmitter<boolean>()
  
  bar0: string = ''
  bar1: string = ''
  bar2: string = ''
  msg:  string = ''
 
  private colors = ['darkred', 'orange', 'yellowgreen']

  private static checkStrength(password: string) {
    let force = 0
    const regex = /[$-/:-?{-~!"^_@`\[\]]/g

    const lowerLetters = /[a-z]+/.test(password)
    const numbers = /[0-9]+/.test(password)
    const symbols = regex.test(password)

    const flags = [lowerLetters, numbers, symbols]

    let passedMatches = 0
    for (const flag of flags) {
      passedMatches += flag === true ? 1 : 0
    }

    force += 2 * password.length + (password.length >= 10 ? 1 : 0)
    force += passedMatches * 10

    // short password
    force = password.length <= 8 ? Math.min(force, 10) : force

    // poor variety of characters
    force = passedMatches === 1 ? Math.min(force, 10) : force
    force = passedMatches === 2 ? Math.min(force, 20) : force
    force = passedMatches === 3 ? Math.min(force, 30) : force

    return force;
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    const password = this.passwordToVerify
    this.setBarColors(4, '#DDD')

    if ( password ) {

      const c = this.getColor(PasswordCheckerComponent.checkStrength(password))
      this.setBarColors(c.idx, c.color)

      const pwdStrength = PasswordCheckerComponent.checkStrength(password)
      pwdStrength === 30
        ? this.passwordStrength.emit(true)
        : this.passwordStrength.emit(false)

      switch (c.idx) {
        case 1:
          this.msg = 'Mala'
          break;
        case 2:
          this.msg = 'Regular'
          break;
        case 3:
          this.msg = 'Buena'
          break;
      }

    } else {
      this.msg = '';
    }
  }

  private getColor(strength:number) {
    let idx = 0
    if ( strength <= 10 ) {
      idx = 0;
    } else if ( strength <= 20 ) {
      idx = 1
    } else if ( strength <= 30 ) {
      idx = 2
    } else {
      idx = 4
    }
    return {
      idx: idx + 1,
      color: this.colors[idx],
    };
  }

  private setBarColors( count:number, color:string ) {
    for ( let n = 0; n < count; n++ ) {
      if( n == 0 ) {
        this.bar0 = color
      }
      if( n == 1 ) {
        this.bar1 = color
      }
      if( n == 2 ) {
        this.bar2 = color
      }
    }
  }
}
