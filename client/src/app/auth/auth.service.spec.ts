import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Account } from './account';
import { AuthService } from './auth.service';

const apiURL = 'http://localhost:8080';

describe('AccountServiceTest', () => {
    let service: AuthService;
    let httpTestingController: HttpTestingController;
    let req: TestRequest;

    const player: Account = {
        id: 1,
        name: 'Player',
        pin: '',
        gameId: 1,
        isBanker: false,
    };

    const banker: Account = {
        id: 2,
        name: 'Banker',
        pin: '',
        gameId: 1,
        isBanker: true,
    };

    const bank: Account = {
      id: 3,
      name: 'Bank',
      pin: '',
      gameId: 1,
      isBanker: false,
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService],
        });

        httpTestingController = TestBed.get(HttpTestingController);
    });

    it('Should have default values', (done: DoneFn) => {
        service = TestBed.get(AuthService);
        expect(() => service.getLoggedAccount()).toThrowError('User is not logged in');
        service.getLoginStatus().subscribe(status => {
          expect(status).toBe(false);
          done();
        });
    });

    it('Should log user in', (done: DoneFn) => {
        service = TestBed.get(AuthService);
        service.joinGame('1234').subscribe({
            complete: () => {
                expect(service.getLoggedAccount()).toBeTruthy();
                done();
            }
        });

        req = httpTestingController.expectOne(`${apiURL}/join/`);
        expect(req.request.body.get('pin')).toBe('1234');
        req.flush(player);

        httpTestingController.verify();
    });

    it('Should get correct status', (done: DoneFn) => {
      service = TestBed.get(AuthService);
      service.joinGame('').subscribe({
        complete: () => checkStatus()
      });

      req = httpTestingController.expectOne(`${apiURL}/join/`);
      req.flush(player);
      httpTestingController.verify();

      function checkStatus() {
        service.getLoginStatus().subscribe(status => {
          expect(status).toBe(true);
          done();
        });
      }
    });

    it('Should get other players', (done: DoneFn) => {
        const url = 'http://localhost:8080/game';

        service = TestBed.get(AuthService);
        service.getOtherPlayers(player).subscribe(p => {
            expect(p).toEqual([banker, bank]);
            done();
        });

        req = httpTestingController.expectOne(`${url}/1/players/`);
        req.flush([player, banker, bank]);
        httpTestingController.verify();
    });

    it('Should get other players, skipping the bank', (done: DoneFn) => {
      const url = 'http://localhost:8080/game';

      service = TestBed.get(AuthService);
      service.getOtherPlayers(player, true).subscribe(p => {
          expect(p).toEqual([banker]);
          done();
      });

      req = httpTestingController.expectOne(`${url}/1/players/`);
      req.flush([player, banker, bank]);

      req = httpTestingController.expectOne(`${url}/1/bank/`);
      req.flush(bank);

      httpTestingController.verify();
  });
});
