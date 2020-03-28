import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Account } from 'src/app/auth/account';
import { AuthService } from 'src/app/auth/auth.service';
import { PlayerDetailComponent } from './player-detail.component';

describe('PlayerDetailComponentTest', () => {
  let fixture: ComponentFixture<PlayerDetailComponent>;
  let component: PlayerDetailComponent;

  beforeEach(() => {
    let authSpy: jasmine.SpyObj<AuthService>;
    authSpy = jasmine.createSpyObj('AuthService', ['getLoggedAccount']);
    authSpy.getLoggedAccount.and.returnValue({} as Account);

    TestBed.configureTestingModule({
      declarations: [PlayerDetailComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: AuthService, useValue: authSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerDetailComponent);
    component = fixture.componentInstance;
  });

  it('Should hide bank name', () => {
    component.isBank = true;
    fixture.detectChanges();
    const shown = fixture.nativeElement.querySelector('p.name');
    expect(shown).toBeNull();
  });
});
