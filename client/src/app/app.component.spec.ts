import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { AppComponent } from './app.component';
import { Account } from './auth/account';
import { AuthService } from './auth/auth.service';

describe('AppComponentTest', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  let spy: jasmine.SpyObj<AuthService>;
  const loginStatus = new BehaviorSubject(false);

  beforeEach(() => {
    spy = jasmine.createSpyObj('AuthService', ['getLoginStatus', 'getLoggedAccount']);
    spy.getLoginStatus.and.returnValue(loginStatus.asObservable());

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: AuthService, useValue: spy }],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('Should have default values', () => {
    const links = fixture.nativeElement.querySelectorAll('a') as NodeList;

    expect(component.account).toBeUndefined();
    expect(links.length).toBe(0);
  });

  it('Should display players link', () => {
    spy.getLoggedAccount.and.returnValue({ isBanker: true } as Account);
    loginStatus.next(true);
    fixture.detectChanges();
    const link = fixture.nativeElement.querySelector('a[title=Players]');

    expect(component.account.isBanker).toBe(true);
    expect(link).not.toBeNull();
  });
});
