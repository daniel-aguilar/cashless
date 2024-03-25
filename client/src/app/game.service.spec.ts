import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment as env } from '../environments/environment';
import { Account } from './auth/account';
import { GameService } from './game.service';

const apiURL = `${env.apiURL}/game`;

describe('GameService', () => {
  let service: GameService;
  let httpTestingController: HttpTestingController;

  const player = { id: 1, gameId: 1 } as Account;
  const banker = { id: 2 } as Account;
  const bank = { isBank: true } as Account;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(GameService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('Should get other players', (done: DoneFn) => {
    service.getOtherPlayersExcept(player).subscribe(p => {
      expect(p).toEqual([banker, bank]);
      done();
    });

    const req = httpTestingController.expectOne(`${apiURL}/1/players`);
    req.flush([player, banker, bank]);
    httpTestingController.verify();
  });

  it('Should get other players, skipping the bank', (done: DoneFn) => {
    service.getOtherPlayersExcept(player, true).subscribe(p => {
      expect(p).toEqual([banker]);
      done();
    });

    const req = httpTestingController.expectOne(`${apiURL}/1/players`);
    req.flush([player, banker, bank]);
    httpTestingController.verify();
  });
});
