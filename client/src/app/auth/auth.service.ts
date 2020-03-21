import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { BankService } from '../banker/bank.service';
import { Account } from './account';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private account?: Account;
  private isLoggedIn = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private bank: BankService) {

  }

  getLoginStatus() {
    return this.isLoggedIn.asObservable();
  }

  getLoggedAccount() {
    if (this.account) {
      return this.account;
    }
    throw Error('User is not logged in');
  }

  getOtherPlayers(except: Account, skipBank = false) {
    const gameId = except.gameId;

    return this.getPlayers(gameId).pipe(
      switchMap(accounts => {
        if (skipBank) {
          return this.bank.getBankAccount(gameId).pipe(
            map(bank => accounts.filter(a => a.id !== bank.id))
          );
        }
        return of(accounts);
      }),
      map(accounts => accounts.filter(a => a.id !== except.id))
    );
  }

  joinGame(pin: string) {
    const data = new FormData();
    data.set('pin', pin);

    return this.http.post<Account>(`${env.apiURL}/join/`, data).pipe(
      tap(a => this.login(a)),
      switchMap(() => EMPTY)
    );
  }

  private login(account: Account) {
    this.account = account;
    this.isLoggedIn.next(true);
  }

  private getPlayers(gameId: number) {
    const url = `${env.apiURL}/game`;
    return this.http.get<Account[]>(`${url}/${gameId}/players/`);
  }
}
