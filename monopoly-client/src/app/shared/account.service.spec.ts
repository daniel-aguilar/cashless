import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { AccountService } from './account.service';
import { Account } from './account';

const apiURL = 'http://localhost:8080';

describe('AccountServiceTest', () => {
    let service: AccountService;
    let httpTestingController: HttpTestingController;
    let req: TestRequest;
    let account: Account = {
        id: 1,
        name: 'Player',
        isBanker: false,
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AccountService],
        });

        httpTestingController = TestBed.get(HttpTestingController);
    });

    it('Should have default values', (done: DoneFn) => {
        service = TestBed.get(AccountService);

        expect(service.canActivate()).toBe(false);
        expect(service.info.id).toBe(0);
        service.getBalance().subscribe(n => {
            expect(n).toBe(0);
            done();
        });

        req = httpTestingController.expectOne(`${apiURL}/account/0/balance/`);
        req.flush(null, { status: 400, statusText: 'error' });
        httpTestingController.verify();
    });

    it('Should log user in', () => {
        service = TestBed.get(AccountService);
        service.login(account);

        expect(service.canActivate()).toBe(true);
        expect(service.info).toEqual(account);
    });

    it('Should get correct balance', (done: DoneFn) => {
        service = TestBed.get(AccountService);
        service.login(account);

        service.getBalance().subscribe(n => {
            expect(n).toBe(100);
            done();
        });

        req = httpTestingController.expectOne(`${apiURL}/account/1/balance/`);
        req.flush(100);
        httpTestingController.verify();
    });
});