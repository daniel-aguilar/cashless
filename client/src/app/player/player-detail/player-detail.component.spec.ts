import { CurrencyPipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Account } from 'src/app/auth/account';
import { BankService } from 'src/app/banker/bank.service';
import { PlayerService } from '../player.service';
import { PlayerDetailComponent } from './player-detail.component';

class MockBankService {
  getBalance() {
    return of(0);
  }
}

const nameElementSelector = 'li.name';

describe('PlayerDetailComponentTest', () => {
  let fixture: ComponentFixture<PlayerDetailComponent>;

  beforeEach(() => {
    const mockPlayerService = { account: { isBank: true } as Account };

    TestBed.configureTestingModule({
      imports: [PlayerDetailComponent],
      providers: [
        { provide: BankService, useClass: MockBankService },
      ],
    });

    TestBed.overrideComponent(PlayerDetailComponent, {
      set: {
        imports: [CurrencyPipe],
        providers: [
          { provide: PlayerService, useValue: mockPlayerService },
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      },
    });
  });

  it('Should hide bank name', () => {
    fixture = TestBed.createComponent(PlayerDetailComponent);
    fixture.detectChanges();
    const nameElement = fixture.nativeElement.querySelector(nameElementSelector);
    expect(nameElement).toBeNull();
  });

  // eslint-disable-next-line @stylistic/ts/quotes
  it("Should display player's name", () => {
    const mockPlayerService = { account: { isBank: false } as Account };
    TestBed.overrideComponent(PlayerDetailComponent, {
      set: {
        providers: [
          { provide: PlayerService, useValue: mockPlayerService },
        ],
      },
    });

    fixture = TestBed.createComponent(PlayerDetailComponent);
    fixture.detectChanges();
    const nameElement = fixture.nativeElement.querySelector(nameElementSelector);
    expect(nameElement).toBeTruthy();
  });
});
