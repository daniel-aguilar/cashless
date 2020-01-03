import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { TransactionLogComponent } from './transaction-log.component';
import { PlayerService } from '../player.service';
import { BankService } from 'src/app/banker/bank.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Account } from 'src/app/auth/account';
import { Payment } from 'src/app/banker/payment';

describe('TransactionLogComponentTest', () => {
    let component: TransactionLogComponent;
    let fixture: ComponentFixture<TransactionLogComponent>;

    beforeEach(() => {
        const authSpy: jasmine.SpyObj<AuthService> = jasmine.createSpyObj('AuthService', ['getLoggedAccount']);
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
        })
        .compileComponents();

        fixture = TestBed.createComponent(TransactionLogComponent);
        component = fixture.componentInstance;
    });

    it('Should add payments', () => {
        const payment = { } as Payment;

        expect(component.payments.length).toBe(0);

        component.addToLog({} as Payment);
        component.addToLog(payment);
        expect(component.payments[0]).toBe(payment);

        component.addToLog({} as Payment);
        component.addToLog({} as Payment);
        expect(component.payments.length).toBe(3);
    });
});
