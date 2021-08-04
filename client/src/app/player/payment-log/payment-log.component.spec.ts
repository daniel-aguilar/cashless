import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BankService } from 'src/app/banker/bank.service';
import { Payment } from 'src/app/banker/payment';
import { PlayerService } from '../player.service';
import { PaymentLogComponent } from './payment-log.component';

describe('PaymentLogComponentTest', () => {
  let fixture: ComponentFixture<PaymentLogComponent>;
  let component: PaymentLogComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentLogComponent],
      providers: [
        { provide: PlayerService, useValue: null },
        { provide: BankService, useValue: null },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentLogComponent);
    component = fixture.componentInstance;
  });

  it('Should add payments', () => {
    const payment = {} as Payment;

    expect(component.payments.length).toBe(0);

    component.addToLog({} as Payment);
    component.addToLog(payment);
    expect(component.payments[0]).toBe(payment);

    component.addToLog({} as Payment);
    component.addToLog({} as Payment);
    expect(component.payments.length).toBe(3);
  });
});
