import { CurrencyPipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Account } from 'src/app/auth/account';
import { Bank } from 'src/app/banker/bank';
import { Player } from '../player';
import { PlayerDetail } from './player-detail';

class MockBankService {
  getBalance() {
    return of(0);
  }
}

const nameElementSelector = 'li.name';

describe('PlayerDetail', () => {
  let fixture: ComponentFixture<PlayerDetail>;

  beforeEach(() => {
    const mockPlayerService = { account: { isBank: true } as Account };

    TestBed.configureTestingModule({
      imports: [PlayerDetail],
      providers: [
        { provide: Bank, useClass: MockBankService },
      ],
    });

    TestBed.overrideComponent(PlayerDetail, {
      set: {
        imports: [CurrencyPipe],
        providers: [
          { provide: Player, useValue: mockPlayerService },
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      },
    });
  });

  it('Should hide bank name', () => {
    fixture = TestBed.createComponent(PlayerDetail);
    fixture.detectChanges();
    const nameElement = fixture.nativeElement.querySelector(nameElementSelector);
    expect(nameElement).toBeNull();
  });

  // eslint-disable-next-line @stylistic/ts/quotes
  it("Should display player's name", () => {
    const mockPlayerService = { account: { isBank: false } as Account };
    TestBed.overrideComponent(PlayerDetail, {
      set: {
        providers: [
          { provide: Player, useValue: mockPlayerService },
        ],
      },
    });

    fixture = TestBed.createComponent(PlayerDetail);
    fixture.detectChanges();
    const nameElement = fixture.nativeElement.querySelector(nameElementSelector);
    expect(nameElement).toBeTruthy();
  });
});
