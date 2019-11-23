package org.danielaguilar.monopoly.service;

import java.util.Arrays;

import org.danielaguilar.monopoly.model.Account;
import org.danielaguilar.monopoly.model.Bank;
import org.danielaguilar.monopoly.model.Transaction;
import org.danielaguilar.monopoly.repository.AccountRepository;
import org.danielaguilar.monopoly.repository.BankRepository;
import org.danielaguilar.monopoly.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BankService {

	@Autowired
	private BankRepository bankRepository;

	@Autowired
	private AccountRepository accountRepository;

	@Autowired
	private TransactionRepository transactionRepository;

	public Iterable<Bank> getBanks() {
		return bankRepository.findAll();
	}

	public Bank createBank(String name) {
		Bank bank = new Bank(name);
		return bankRepository.save(bank);
	}

	public void transferMoney(Account sender, Account recipient, Integer amount) {
		if (sender.getBank().equals(recipient.getBank())) {
			Transaction transaction = new Transaction();
			transaction.setSender(sender);
			transaction.setRecipient(recipient);
			transaction.setAmount(amount);

			sender.withdraw(amount);
			recipient.deposit(amount);

			transactionRepository.save(transaction);
			accountRepository.saveAll(Arrays.asList(sender, recipient));
		} else {
			throw new IllegalArgumentException();
		}
	}
}
