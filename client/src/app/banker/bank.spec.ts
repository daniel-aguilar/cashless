import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, TestRequest, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Auth } from 'src/app/auth/auth';
import { environment as env } from 'src/environments/environment';
import { Account } from '../auth/account';
import { Bank } from './bank';

const apiURL = `${env.apiURL}/account`;

describe('Bank', () => {
  const player = { id: 1 } as Account;
  const banker = { id: 2 } as Account;

  let service: Bank;
  let httpTestingController: HttpTestingController;
  let req: TestRequest;

  beforeEach(() => {
    const authSpy: jasmine.SpyObj<Auth> =
      jasmine.createSpyObj('AuthService', ['getLoggedAccount']);
    authSpy.getLoggedAccount.and.returnValue(player);

    TestBed.configureTestingModule({
      providers: [
        Bank,
        { provide: Auth, useValue: authSpy },
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });

    service = TestBed.inject(Bank);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('Should get correct balance', (done: DoneFn) => {
    service.getBalance(player).subscribe(n => {
      expect(n).toBe(100);
      done();
    });

    req = httpTestingController.expectOne(`${apiURL}/1/balance`);
    req.flush(100);
    httpTestingController.verify();
  });

  it('Should transfer amount', () => {
    service.makeTransaction(player, 100, banker).subscribe();

    req = httpTestingController.expectOne(`${apiURL}/1/transfer`);
    expect(req.request.body).toEqual({ amount: 100, to: 2 });

    req.flush(null);
    httpTestingController.verify();
  });
});
