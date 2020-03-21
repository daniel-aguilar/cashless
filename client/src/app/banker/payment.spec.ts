import { Account } from '../auth/account';
import { Transaction } from './transaction';
import { Payment } from './payment';

describe('PaymentTest', () => {

    it('Should create payment', () => {
        const sender: Account = {
            id: 1,
            name: 'Sender',
            pin: '',
            gameId: 1,
            isBanker: false,
        };

        const recipient: Account = {
            id: 2,
            name: 'Recipient',
            pin: '',
            gameId: 1,
            isBanker: false,
        };

        const tx: Transaction = {
            id: 1,
            sender,
            recipient,
            amount: 100,
            date: '2020-01-03',
        };

        const payment = new Payment(tx, sender);
        expect(payment.isIncoming).toBe(false);
        expect(payment.account).toBe(recipient);
    });
});
