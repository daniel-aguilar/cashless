import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { Account } from 'src/app/auth/account';
import { BankService } from 'src/app/banker/bank.service';
import { PlayerService } from '../player.service';
import { PlayerDetailComponent } from './player-detail.component';

class MockBankService {
  getBalance() {
    return of(0);
  }

  getLatestPayments() {
    return of([]);
  }
}

@Component({selector: 'app-payment-log', template: ''})
class PaymentLogComponent {}

describe('PlayerDetailComponentTest', () => {
  let fixture: ComponentFixture<PlayerDetailComponent>;
  let component: PlayerDetailComponent;

  beforeEach(() => {
    const mockPlayerService = { account: { isBank: true } as Account };

    TestBed.configureTestingModule({
      imports: [PlayerDetailComponent, PaymentLogComponent],
      providers: [
        { provide: BankService, useClass: MockBankService },
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideNoopAnimations(),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    TestBed.overrideComponent(PlayerDetailComponent, {
      set: {
        providers: [
          { provide: PlayerService, useValue: mockPlayerService },
        ],
      },
    });

    fixture = TestBed.createComponent(PlayerDetailComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('Should hide bank name', () => {
    fixture.detectChanges();
    const shown = fixture.nativeElement.querySelector('p.name');
    expect(shown).toBeNull();
  });
});
