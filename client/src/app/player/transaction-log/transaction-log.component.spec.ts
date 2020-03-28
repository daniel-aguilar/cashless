import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Account } from 'src/app/auth/account';
import { AuthService } from 'src/app/auth/auth.service';
import { BankService } from 'src/app/banker/bank.service';
import { Payment } from 'src/app/banker/payment';
import { PlayerService } from '../player.service';
import { TransactionLogComponent } from './transaction-log.component';

describe('TransactionLogComponentTest', () => {
  let fixture: ComponentFixture<TransactionLogComponent>;
  let component: TransactionLogComponent;

  beforeEach(() => {
    let authSpy: jasmine.SpyObj<AuthService>;
    authSpy = jasmine.createSpyObj('AuthService', ['getLoggedAccount']);
    authSpy.getLoggedAccount.and.returnValue({} as Account);

    TestBed.configureTestingModule({
      declarations: [TransactionLogComponent],
      providers: [
        PlayerService,
        BankService,
        { provide: AuthService, useValue: authSpy },
      ],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionLogComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
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
