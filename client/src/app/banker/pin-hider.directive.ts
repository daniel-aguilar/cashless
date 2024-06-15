import { Directive, ElementRef, HostListener } from '@angular/core';

const visible = 'visible';

@Directive({ selector: '[appPinHider]' })
export class PinHiderDirective {

  constructor(private el: ElementRef) {
    this.hideContent();
  }

  @HostListener('mouseover')
  onMouseOver() {
    this.el.nativeElement.classList.add(visible);
  }

  @HostListener('mouseleave')
  hideContent() {
    this.el.nativeElement.classList.remove(visible);
  }
}
