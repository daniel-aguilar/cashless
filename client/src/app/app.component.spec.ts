import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { AppComponent } from './app.component';
import { Account } from './auth/account';
import { AuthService } from './auth/auth.service';

describe('AppComponentTest', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let playersLink: HTMLAnchorElement;

  let spy: jasmine.SpyObj<AuthService>;
  const loginStatus = new BehaviorSubject(false);

  beforeEach(() => {
    spy = jasmine.createSpyObj('AuthService', ['getLoginStatus', 'getLoggedAccount']);
    spy.getLoginStatus.and.returnValue(loginStatus.asObservable());

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: AuthService, useValue: spy }],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  it('Should have default values', () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    playersLink = fixture.nativeElement.querySelector('a');

    expect(component.isBanker).toBe(false);
    expect(playersLink).toBeNull();
  });

  it('Should display players link', () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    spy.getLoggedAccount.and.returnValue({ isBanker: true } as Account);

    component.ngOnInit();
    loginStatus.next(true);
    fixture.detectChanges();
    playersLink = fixture.nativeElement.querySelector('a');

    expect(component.isBanker).toBe(true);
    expect(playersLink).toBeDefined();
  });
});
