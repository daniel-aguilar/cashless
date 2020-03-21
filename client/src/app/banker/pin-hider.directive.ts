import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({ selector: '[appPinHider]' })
export class PinHiderDirective {

  constructor(private el: ElementRef) {
    this.hideContent();
  }

  @HostListener('mouseover')
  onMouseOver() {
    this.el.nativeElement.style.color = 'white';
  }

  @HostListener('mouseleave')
  hideContent() {
    const black = 'black';
    this.el.nativeElement.style.color = black;
    this.el.nativeElement.style.background = black;
  }
}
