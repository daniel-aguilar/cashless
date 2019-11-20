import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Bank } from '../shared/bank';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private http: HttpClient) { }

  getBanks() {
    return this.http.get<Bank[]>('http://localhost:8080/bank/');
  }

  getBank(id: number) {
    return this.http.get<Bank>(`http://localhost:8080/bank/${id}`);
  }

  createBank(name: string) {
    let params = new FormData();
    params.set('name', name);

    return this.http.post('http://localhost:8080/bank/new/', params);
  }

  transfer(fromAccount: number, toAccount: number, amount: number) {
    return this.http.post('http://localhost:8080/bank/transfer/', {
      from: fromAccount,
      to: toAccount,
      amount,
    });
  }
}
