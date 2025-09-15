import { Component, inject } from '@angular/core';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatTabsModule } from '@angular/material/tabs';
import { map } from 'rxjs';
import { Auth } from '../auth/auth';
import { AccountDetail } from '../account/account-detail/account-detail';
import { Bank } from './bank';

@Component({
  selector: 'app-banker',
  templateUrl: './banker.html',
  imports: [
    MatTabsModule,
    AccountDetail,
  ],
})
export class Banker {
  private bankService = inject(Bank);
  private auth = inject(Auth);
  private breakpointObserver = inject(BreakpointObserver);

  account = this.auth.getLoggedAccount();
  bank = toSignal(this.bankService.getBankAccount(this.account.gameId));
  isHandset = toSignal(
    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait])
      .pipe(map(res => res.matches)),
    { initialValue: false }
  );
}
