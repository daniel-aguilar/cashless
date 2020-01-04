import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

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
        gameId: 1,
        isBanker: false,
    };

    const banker: Account = {
        id: 2,
        name: 'Banker',
        gameId: 1,
        isBanker: true,
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService],
        });

        httpTestingController = TestBed.get(HttpTestingController);
    });

    it('Should have default values', () => {
        service = TestBed.get(AuthService);
        expect(() => service.getLoggedAccount()).toThrowError('User is not logged in');
    });

    it('Should log user in', (done: DoneFn) => {
        service = TestBed.get(AuthService);
        service.joinGame('1234').subscribe({
            complete: () => {
                expect(service.getLoggedAccount()).toBeTruthy();
                expect(service.players.length).toBe(0);
                done();
            }
        });

        req = httpTestingController.expectOne(`${apiURL}/join/`);
        expect(req.request.body.get('pin')).toBe('1234');
        req.flush(player);

        httpTestingController.verify();
    });

    it('Should log banker in', (done: DoneFn) => {
        service = TestBed.get(AuthService);
        service.joinGame('').subscribe({
            complete: () => {
                expect(service.players).toEqual([player, banker]);
                done();
            }
        });

        req = httpTestingController.expectOne(`${apiURL}/join/`);
        req.flush(banker);

        req = httpTestingController.expectOne(`${apiURL}/game/1/players/`);
        req.flush([player, banker]);

        httpTestingController.verify();
    });

    it('Should get other players', (done: DoneFn) => {
        const url = 'http://localhost:8080/game';

        service = TestBed.get(AuthService);
        service.getOtherPlayers(player).subscribe(p => {
            expect(p).toEqual([banker]);
            done();
        });

        req = httpTestingController.expectOne(`${url}/1/players/`);
        req.flush([player, banker]);
        httpTestingController.verify();
    });
});
