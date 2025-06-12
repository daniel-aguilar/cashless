import { Account } from '../auth/account';
import { Payment } from './payment';
import { Transaction } from './transaction';

describe('Payment', () => {
  it('Should create payment', () => {
    const sender = { id: 1 } as Account;
    const recipient = { id: 2 } as Account;
    const tx = { sender, recipient } as Transaction;

    const payment = new Payment(tx, sender);
    expect(payment.isIncoming).toBeFalse();
    expect(payment.account).toBe(recipient);
  });
});
