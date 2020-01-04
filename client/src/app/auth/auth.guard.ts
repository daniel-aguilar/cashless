import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private auth: AuthService) {

    }

    canActivate() {
        try {
            return Boolean(this.auth.getLoggedAccount());
        } catch (error) {
            return this.router.parseUrl('/');
        }
    }
}
