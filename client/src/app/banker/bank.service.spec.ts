import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, TestRequest, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/auth/auth.service';
import { environment as env } from 'src/environments/environment';
import { Account } from '../auth/account';
import { BankService } from './bank.service';

const apiURL = `${env.apiURL}/account`;

describe('BankServiceTest', () => {
  const player = { id: 1 } as Account;
  const banker = { id: 2 } as Account;

  let service: BankService;
  let httpTestingController: HttpTestingController;
  let req: TestRequest;

  beforeEach(() => {
    const authSpy: jasmine.SpyObj<AuthService> =
      jasmine.createSpyObj('AuthService', ['getLoggedAccount']);
    authSpy.getLoggedAccount.and.returnValue(player);

    TestBed.configureTestingModule({
      providers: [
        BankService,
        { provide: AuthService, useValue: authSpy },
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });

    service = TestBed.inject(BankService);
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
