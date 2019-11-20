import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { Account } from './account';
import { Bank } from './bank';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AccountService {
    private account?: Account;

    constructor(private http: HttpClient) {
        const json = localStorage.getItem('account');

        if (json) {
            this.account = JSON.parse(json);
        }
    }

    get loggedAccount() {
        if (this.account) {
            return this.account;
        } else {
            throw new Error('user not logged in');
        }
    }

    getAccounts() {
        return this.http.get<Account[]>('http://localhost:8080/account/');
    }

    createAccount(bank: Bank, account: string) {
        let data = new FormData();
        data.set('name', account);

        return this.http.post<Account>(`http://localhost:8080/bank/${bank.id}/newAccount/`, data).pipe(
            tap(account => this.save(account))
        );
    }

    getBalance() {
        // TODO: Move to BankService
        if (this.account) {
            return this.http.get<number>(`http://localhost:8080/account/${this.account.id}/balance/`);
        } else {
            return throwError('user not logged in');
        }
    }

    private save(account: Account) {
        this.account = account;
        localStorage.setItem('account', JSON.stringify(account));
    }
}