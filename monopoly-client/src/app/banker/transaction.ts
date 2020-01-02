import { Account } from '../auth/account';

export interface Transaction {
    id: number;
    sender: Account;
    recipient: Account;
    amount: number;
    date: string;
}
