import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Account } from './account';
import { AuthService } from './auth.service';

const apiURL = 'http://localhost:8080';

describe('AccountServiceTest', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  let req: TestRequest;

  const player = { id: 1, gameId: 1 } as Account;
  const banker = { id: 2 } as Account;
  const bank = {} as Account;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [AuthService],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('Should have default values', (done: DoneFn) => {
    service = TestBed.inject(AuthService);
    expect(() => service.getLoggedAccount()).toThrowError('User is not logged in');
    service.getLoginStatus().subscribe(status => {
      expect(status).toBe(false);
      done();
    });
  });

  it('Should log user in', (done: DoneFn) => {
    service = TestBed.inject(AuthService);
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

  // Check the status in a different method to keep the tests short
  it('Should get correct status', (done: DoneFn) => {
    service = TestBed.inject(AuthService);
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

    service = TestBed.inject(AuthService);
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

    service = TestBed.inject(AuthService);
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
