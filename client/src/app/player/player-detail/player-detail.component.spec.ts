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

describe('PlayerDetailComponentTest', () => {
  let fixture: ComponentFixture<PlayerDetailComponent>;
  let component: PlayerDetailComponent;

  beforeEach(() => {
    const mockPlayerService = { account: { isBank: true } as Account };

    TestBed.configureTestingModule({
      providers: [
        { provide: BankService, useClass: MockBankService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    TestBed.overrideComponent(PlayerDetailComponent, {
      set: {
        imports: [],
        providers: [
          { provide: PlayerService, useValue: mockPlayerService },
        ],
      },
    });

    fixture = TestBed.createComponent(PlayerDetailComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  xit('Should hide bank name', () => {
    fixture.detectChanges();
    const shown = fixture.nativeElement.querySelector('li.name');
    expect(shown).toBeNull();
  });
});
