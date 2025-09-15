import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment as env } from '../environments/environment';
import { Account } from './auth/account';
import { Game } from './game';

const apiURL = `${env.apiURL}/game`;

describe('Game', () => {
  let service: Game;
  let httpTestingController: HttpTestingController;

  const player = { id: 1, gameId: 1 } as Account;
  const banker = { id: 2 } as Account;
  const bank = { isBank: true } as Account;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(Game);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('Should get other accounts', (done: DoneFn) => {
    service.getOtherAccountsExcept(player).subscribe(p => {
      expect(p).toEqual([banker, bank]);
      done();
    });

    const req = httpTestingController.expectOne(`${apiURL}/1/accounts`);
    req.flush([player, banker, bank]);
    httpTestingController.verify();
  });

  it('Should get other accounts, skipping the bank', (done: DoneFn) => {
    service.getOtherAccountsExcept(player, true).subscribe(p => {
      expect(p).toEqual([banker]);
      done();
    });

    const req = httpTestingController.expectOne(`${apiURL}/1/accounts`);
    req.flush([player, banker, bank]);
    httpTestingController.verify();
  });
});
