import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({ selector: '[appPaymentType]' })
export class PaymentTypeDirective implements OnInit {

    @Input()
    isIncoming = false;

    constructor(private el: ElementRef) {

    }

    ngOnInit() {
        const style = this.el.nativeElement.style;

        if (this.isIncoming) {
            style.background = '#C8E6C9';
        } else {
            style.background = '#FFCDD2';
        }
    }
}
