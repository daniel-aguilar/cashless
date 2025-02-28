import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, inject, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BankService } from 'src/app/banker/bank.service';
import { Payment } from 'src/app/banker/payment';
import { LocalizeNamePipe } from '../localize-name.pipe';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-payment-log',
  templateUrl: './payment-log.component.html',
  styleUrls: ['./payment-log.component.css'],
  imports: [
    DatePipe,
    MatIconModule,
    LocalizeNamePipe,
    MatButtonModule,
    RouterLink,
  ],
})
export class PaymentLogComponent implements OnInit, OnDestroy {
  emptyLines = [...Array(4).keys()];
  payments: Payment[] = [];

  readonly balanceChange = output();

  private currentPayments: Subscription;
  private currentPlayer = inject(PlayerService);
  private bank = inject(BankService);

  private get player() {
    return this.currentPlayer.account;
  }

  ngOnInit() {
    const lastThree = this.bank.getLatestPayments(this.player);

    this.currentPayments = lastThree.pipe(
      switchMap(payments => {
        this.payments = payments;
        return this.bank.getPayments(this.player);
      })
    ).subscribe(p => this.addToLog(p));
  }

  ngOnDestroy() {
    this.currentPayments.unsubscribe();
  }

  addToLog(p: Payment) {
    this.payments.unshift(p);
    this.balanceChange.emit();

    if (this.payments.length > 3) {
      this.payments.pop();
    }
  }
}
