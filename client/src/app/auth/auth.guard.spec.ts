import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Account } from './account';

describe('AuthGuardTest', () => {
    let authSpy: jasmine.SpyObj<AuthService>;
    let routerSpy: jasmine.SpyObj<Router>;

    beforeEach(() => {
        authSpy = jasmine.createSpyObj('AuthService', ['getLoggedAccount']);
        routerSpy = jasmine.createSpyObj('Router', ['parseUrl']);
        routerSpy.parseUrl.and.returnValue({} as UrlTree);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                { provide: AuthService, useValue: authSpy },
                { provide: Router, useValue: routerSpy },
                AuthGuard,
            ],
        });
    });

    it('Should activate', () => {
        const guard = TestBed.inject(AuthGuard) as AuthGuard;
        authSpy.getLoggedAccount.and.returnValue({} as Account);

        expect(guard.canActivate()).toBe(true);
    });

    it('Should not activate', () => {
        const guard = TestBed.inject(AuthGuard) as AuthGuard;
        authSpy.getLoggedAccount.and.throwError('User is not logged in');

        expect(guard.canActivate()).toBeDefined();
        expect(routerSpy.parseUrl.calls.count()).toBe(1);
    });
});
