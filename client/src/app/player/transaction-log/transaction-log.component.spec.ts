import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject, of } from 'rxjs';
import { Account } from 'src/app/auth/account';
import { AuthService } from 'src/app/auth/auth.service';
import { BankService } from 'src/app/banker/bank.service';
import { Transaction } from 'src/app/banker/transaction';
import { TransactionLogComponent } from './transaction-log.component';

describe('TransactionLogComponentTest', () => {
  let fixture: ComponentFixture<TransactionLogComponent>;
  let component: TransactionLogComponent;
  const txs = new Subject<Transaction>();

  beforeEach(() => {
    const bankSpy = jasmine.createSpyObj('BankService', ['getTransactionLog']);
    bankSpy.getTransactionLog.and.returnValue(of([]));
    bankSpy.transactions = txs;

    const authSpy: jasmine.SpyObj<AuthService>
        = jasmine.createSpyObj('AuthService', ['getLoggedAccount']);
    authSpy.getLoggedAccount.and.returnValue({ gameId: 1 } as Account);

    TestBed.configureTestingModule({
      imports: [TransactionLogComponent],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: BankService, useValue: bankSpy },
      ]
    });

    fixture = TestBed.createComponent(TransactionLogComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('Should filter transactions', () => {
    const a1 = { gameId: 1 } as Account;
    const a2 = { gameId: 2 } as Account;

    const t1 = { sender: a1, recipient: a1 } as Transaction;
    const t2 = { sender: a1, recipient: a2 } as Transaction;
    const t3 = { sender: a2, recipient: a1 } as Transaction;

    expect(component.transactions.length).toBe(0);
    txs.next(t1);
    txs.next(t2);
    txs.next(t3);
    expect(component.transactions.length).toBe(1);
    expect(component.transactions[0]).toBe(t1);
  });
});
