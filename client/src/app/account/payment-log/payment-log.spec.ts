import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { EMPTY } from 'rxjs';
import { Bank } from 'src/app/banker/bank';
import { Payment } from 'src/app/banker/payment';
import { CurrentAccount } from '../current-account';
import { PaymentLog } from './payment-log';

describe('PaymentLog', () => {
  it('Should add payments', () => {
    const spy: Pick<Bank, 'getLatestPayments'> = {
      getLatestPayments: vi.fn().mockReturnValue(EMPTY)
    };

    TestBed.configureTestingModule({
      imports: [PaymentLog],
      providers: [
        { provide: CurrentAccount, useValue: { account: null } },
        { provide: Bank, useValue: spy },
        provideRouter([]),
      ],
    });

    const component = TestBed.createComponent(PaymentLog).componentInstance;
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
