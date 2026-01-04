import { CurrencyPipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Account } from 'src/app/auth/account';
import { Bank } from 'src/app/banker/bank';
import { CurrentAccount } from '../current-account';
import { AccountDetail } from './account-detail';

class MockBankService {
  getBalance() {
    return of(0);
  }
}

const nameElementSelector = 'li.name';

describe('AccountDetail', () => {
  let fixture: ComponentFixture<AccountDetail>;

  beforeEach(async () => {
    const mockCurrentAccountService = { instance: { isBank: true } as Account };

    TestBed.configureTestingModule({
      imports: [AccountDetail],
      providers: [
        { provide: Bank, useClass: MockBankService },
      ],
    });

    TestBed.overrideComponent(AccountDetail, {
      set: {
        imports: [CurrencyPipe],
        providers: [
          { provide: CurrentAccount, useValue: mockCurrentAccountService },
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      },
    });

    await TestBed.compileComponents();
  });

  it('Should hide bank name', () => {
    fixture = TestBed.createComponent(AccountDetail);
    fixture.detectChanges();
    const nameElement = fixture.nativeElement.querySelector(nameElementSelector);
    expect(nameElement).toBeNull();
  });

  // eslint-disable-next-line @stylistic/ts/quotes
  it("Should display player's name", () => {
    const mockCurrentAccountService = { instance: { isBank: false } as Account };
    TestBed.overrideComponent(AccountDetail, {
      set: {
        providers: [
          { provide: CurrentAccount, useValue: mockCurrentAccountService },
        ],
      },
    });

    fixture = TestBed.createComponent(AccountDetail);
    fixture.detectChanges();
    const nameElement = fixture.nativeElement.querySelector(nameElementSelector);
    expect(nameElement).toBeTruthy();
  });
});
