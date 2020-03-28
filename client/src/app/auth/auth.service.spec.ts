import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Account } from './account';
import { AuthService } from './auth.service';

describe('AccountServiceTest', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
  });

  it('Should have default values', (done: DoneFn) => {
    expect(() => service.getLoggedAccount()).toThrowError('User is not logged in');
    service.getLoginStatus().subscribe(status => {
      expect(status).toBe(false);
      done();
    });
  });

  it('Should log user in', (done: DoneFn) => {
    const account = {} as Account;

    service.login(account);
    expect(service.getLoggedAccount()).toBe(account);
    service.getLoginStatus().subscribe(status => {
      expect(status).toBe(true);
      done();
    });
  });

  it('Should log user out', (done: DoneFn) => {
    service.login({} as Account);

    service.logout();
    expect(service.getLoggedAccount).toThrowError();
    service.getLoginStatus().subscribe(status => {
      expect(status).toBe(false);
      done();
    });
  });
});
