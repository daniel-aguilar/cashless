package org.danielaguilar.monopoly.service;

import java.util.Arrays;
import java.util.Optional;

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

	public Bank createBank(String name) {
		Bank bank = new Bank(name);
		return bankRepository.save(bank);
	}

	public Iterable<Bank> getBanks() {
		return bankRepository.findAll();
	}

	public Optional<Bank> findBank(Integer bankId) {
		return bankRepository.findById(bankId);
	}

	public Account createAccount(Bank bank, String name) {
		Account newAccount = new Account();
		newAccount.setName(name);
		newAccount.setBank(bank);
		return accountRepository.save(newAccount);
	}

	public void makeTransaction(Account sender, Account recipient, Integer amount) {
		Transaction transaction = new Transaction();
		transaction.setFrom(sender);
		transaction.setTo(recipient);
		transaction.setAmount(amount);

		sender.withdraw(amount);
		recipient.deposit(amount);

		transactionRepository.save(transaction);
		accountRepository.saveAll(Arrays.asList(sender, recipient));
	}
}
