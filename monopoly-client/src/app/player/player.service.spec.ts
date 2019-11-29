import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { AuthService } from 'src/app/auth/auth.service';
import { PlayerService } from './player.service';
import { Account } from '../auth/account';

const apiURL = 'http://localhost:8080/account';

describe('AccountServiceTest', () => {
    const player: Account = {
        id: 1,
        name: 'Player',
        gameId: 1,
        isBanker: false,
    };

    const banker: Account = {
        id: 2,
        name: 'Banker',
        gameId: 1,
        isBanker: true,
    };

    let service: PlayerService;
    let httpTestingController: HttpTestingController;
    let req: TestRequest;

    beforeEach(() => {
        const authSpy: jasmine.SpyObj<AuthService> =
            jasmine.createSpyObj('AuthService', ['getLoggedAccount']);
        authSpy.getLoggedAccount.and.returnValue(player);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                PlayerService,
                { provide: AuthService, useValue: authSpy },
            ],
        });

        httpTestingController = TestBed.get(HttpTestingController);
    });

    it('Should get player name', () => {
        service = TestBed.get(PlayerService);
        expect(service.name).toBe('Player');
    });

    it('Should get correct balance', (done: DoneFn) => {
        service = TestBed.get(PlayerService);

        service.getBalance().subscribe(n => {
            expect(n).toBe(100);
            done();
        });

        req = httpTestingController.expectOne(`${apiURL}/1/balance/`);
        req.flush(100);
        httpTestingController.verify();
    });

    it('Should get other players', (done: DoneFn) => {
        const url = 'http://localhost:8080/game';

        service = TestBed.get(PlayerService);
        service.getOtherPlayers().subscribe(p => {
            expect(p).toEqual([banker]);
            done();
        });

        req = httpTestingController.expectOne(`${url}/1/players/`);
        req.flush([player, banker]);
        httpTestingController.verify();
    });

    it('Should transfer amount', () => {
        service = TestBed.get(PlayerService);
        service.transfer(100, banker).subscribe();

        req = httpTestingController.expectOne(`${apiURL}/1/transfer/`);
        expect(req.request.body).toEqual({ amount: 100, to: 2 });

        req.flush(null);
        httpTestingController.verify();
    });
});
