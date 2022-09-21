import { Directive } from '@angular/core';
import { AbstractControl, Validator, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appSubdomain]'
})
export class SubdomainDirective {

  validate(control: AbstractControl) : {[key: string]: boolean} | null {
    if (control.value && control.value.length != 10) {
      return { 'subdomainInvalid': true };
    }
    return null;
  }
  
}

