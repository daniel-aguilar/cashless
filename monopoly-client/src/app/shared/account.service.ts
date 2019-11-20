import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { Account } from './account';
import { Bank } from './bank';

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

    get account() {
        return this._account;
    }

    createAccount(bank: Bank, account: string) {
        let data = new FormData();
        data.set('name', account);

        return this.http.post<Account>(`http://localhost:8080/bank/${bank.id}/newAccount/`, data).pipe(
            tap(account => this.save(account))
        );
    }

    private save(account: Account) {
        this.account = account;
        localStorage.setItem('account', JSON.stringify(account));
    }
}