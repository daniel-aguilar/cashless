import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { EMPTY } from 'rxjs';
import { BankService } from 'src/app/banker/bank.service';
import { Payment } from 'src/app/banker/payment';
import { PlayerService } from '../player.service';
import { PaymentLogComponent } from './payment-log.component';

describe('PaymentLogComponentTest', () => {
  it('Should add payments', () => {
    const spy: jasmine.SpyObj<BankService> =
        jasmine.createSpyObj('BankService', ['getLatestPayments']);
    spy.getLatestPayments.and.returnValue(EMPTY);

    TestBed.configureTestingModule({
      imports: [PaymentLogComponent],
      providers: [
        { provide: PlayerService, useValue: { account: null } },
        { provide: BankService, useValue: spy },
        provideRouter([]),
      ],
    });

    const component = TestBed.createComponent(PaymentLogComponent).componentInstance;
    const payment = {} as Payment;

    component.ngOnInit();
    expect(component.payments.length).toBe(0);

    component.addToLog({} as Payment);
    component.addToLog(payment);
    expect(component.payments[0]).toBe(payment);

    component.addToLog({} as Payment);
    component.addToLog({} as Payment);
    expect(component.payments.length).toBe(3);
  });
});
