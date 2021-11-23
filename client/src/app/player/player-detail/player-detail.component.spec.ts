import { NO_ERRORS_SCHEMA } from '@angular/core';
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

describe('PlayerDetailComponentTest', () => {
  let fixture: ComponentFixture<PlayerDetailComponent>;
  let component: PlayerDetailComponent;

  beforeEach(() => {
    const mockPlayerService = { account: { isBank: true } as Account };

    TestBed.overrideComponent(PlayerDetailComponent, {
      set: {
        providers: [
          { provide: PlayerService, useValue: mockPlayerService },
        ],
      },
    });

    TestBed.configureTestingModule({
      declarations: [PlayerDetailComponent],
      providers: [
        { provide: BankService, useClass: MockBankService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

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
