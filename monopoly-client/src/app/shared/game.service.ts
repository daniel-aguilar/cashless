import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Account } from './account';

const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) {

  }

  join(pin: string) {
    const data = new FormData();
    data.set('pin', pin);

    return this.http.post<Account>(`${apiURL}/join/`, data);
  }
}
