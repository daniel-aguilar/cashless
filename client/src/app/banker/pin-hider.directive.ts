import { Directive, ElementRef, HostListener, inject } from '@angular/core';

const visible = 'visible';

@Directive({ selector: '[appPinHider]' })
export class PinHiderDirective {
  private el = inject(ElementRef);

  constructor() {
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
