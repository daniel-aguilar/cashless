import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Account } from './account';
import { AuthService } from './auth.service';

describe('AccountServiceTest', () => {
  let service: AuthService;

  function setup() {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
  }

  beforeEach(() => {
    localStorage.clear();
    setup();
  });

  it('Should have default values', (done: DoneFn) => {
    expect(service.savedPin).toBeNull();
    expect(() => service.getLoggedAccount()).toThrowError('User is not logged in');
    service.getLoginStatus().subscribe(status => {
      expect(status).toBe(false);
      done();
    });
  });

  it('Should fetch saved PIN', () => {
    TestBed.resetTestingModule();
    localStorage.setItem('pin', '1234');
    setup();

    expect(service.savedPin).toEqual('1234');
  });

  it('Should log user in', (done: DoneFn) => {
    const account = { pin: '1111' } as Account;

    service.login(account);
    const savedPin = localStorage.getItem('pin');

    expect(savedPin).toEqual('1111');
    expect(service.getLoggedAccount()).toBe(account);

    service.getLoginStatus().subscribe(status => {
      expect(status).toBe(true);
      done();
    });
  });

  it('Should log user out', (done: DoneFn) => {
    service.login({} as Account);

    service.logout();
    const savedPin = localStorage.getItem('pin');

    expect(savedPin).toBeNull();
    expect(service.getLoggedAccount).toThrowError();

    service.getLoginStatus().subscribe(status => {
      expect(status).toBe(false);
      done();
    });
  });
});
