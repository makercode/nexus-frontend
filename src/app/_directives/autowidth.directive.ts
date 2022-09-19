import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAutowidth]'
})
export class AutowidthDirective {

  constructor(private element: ElementRef) {}

  @HostListener('keyup') onKeyUp() {
    this.resize()
  }

  @HostListener('focus') onFocus() {
    this.resize()
  }

  private resize() {
    this.element.nativeElement.setAttribute('size', this.element.nativeElement.value.length)
  }

}
