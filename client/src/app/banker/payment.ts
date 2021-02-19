import { Account } from '../auth/account';
import { Transaction } from './transaction';

export class Payment {
  isIncoming: boolean;
  account: Account;
  tx: Transaction;

  constructor(tx: Transaction, owner: Account) {
    this.tx = tx;
    this.isIncoming = tx.recipient.id === owner.id;
    this.account = this.isIncoming ? tx.sender : tx.recipient;
  }
}
