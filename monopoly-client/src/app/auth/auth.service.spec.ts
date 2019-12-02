import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { Router, UrlTree } from '@angular/router';

import { Account } from './account';
import { AuthService } from './auth.service';

const apiURL = 'http://localhost:8080';

describe('AccountServiceTest', () => {
    let service: AuthService;
    let httpTestingController: HttpTestingController;
    let req: TestRequest;
    let routerSpy: jasmine.SpyObj<Router>;

    beforeEach(() => {
        routerSpy = jasmine.createSpyObj('Router', ['parseUrl']);
        routerSpy.parseUrl.and.returnValue({} as UrlTree);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                { provide: Router, useValue: routerSpy },
                AuthService,
            ],
        });

        httpTestingController = TestBed.get(HttpTestingController);
    });

    it('Should have default values', () => {
        service = TestBed.get(AuthService);
        expect(service.canActivate()).toBeTruthy();
        expect(routerSpy.parseUrl.calls.count()).toBe(1);
        expect(() => service.getLoggedAccount()).toThrowError('User is not logged in');
    });

    it('Should log user in', (done: DoneFn) => {
        const account: Account = {
            id: 1,
            name: 'Player',
            gameId: 1,
            isBanker: false,
        };

        service = TestBed.get(AuthService);
        service.joinGame('1234').subscribe({
            complete: () => {
                expect(service.canActivate()).toBe(true);
                expect(service.getLoggedAccount()).toBeTruthy();
                done();
            }
        });

        req = httpTestingController.expectOne(`${apiURL}/join/`);
        expect(req.request.body.get('pin')).toBe('1234');

        req.flush(account);
        httpTestingController.verify();
    });
});
