import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { AuthService } from 'src/app/auth/auth.service';
import { BankService } from './bank.service';
import { Account } from '../auth/account';

const apiURL = 'http://localhost:8080/account';

describe('BankServiceTest', () => {
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

    let service: BankService;
    let httpTestingController: HttpTestingController;
    let req: TestRequest;

    beforeEach(() => {
        const authSpy: jasmine.SpyObj<AuthService> =
            jasmine.createSpyObj('AuthService', ['getLoggedAccount']);
        authSpy.getLoggedAccount.and.returnValue(player);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                BankService,
                { provide: AuthService, useValue: authSpy },
            ],
        });

        httpTestingController = TestBed.get(HttpTestingController);
    });

    it('Should get correct balance', (done: DoneFn) => {
        service = TestBed.get(BankService);

        service.getBalance(player).subscribe(n => {
            expect(n).toBe(100);
            done();
        });

        req = httpTestingController.expectOne(`${apiURL}/1/balance/`);
        req.flush(100);
        httpTestingController.verify();
    });

    it('Should transfer amount', () => {
        service = TestBed.get(BankService);
        service.makeTransaction(player, 100, banker).subscribe();

        req = httpTestingController.expectOne(`${apiURL}/1/transfer/`);
        expect(req.request.body).toEqual({ amount: 100, to: 2 });

        req.flush(null);
        httpTestingController.verify();
    });
});
