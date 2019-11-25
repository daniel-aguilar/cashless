package org.danielaguilar.monopoly.service;

import java.util.Arrays;

import org.danielaguilar.monopoly.model.Account;
import org.danielaguilar.monopoly.model.Transaction;
import org.danielaguilar.monopoly.repository.AccountRepository;
import org.danielaguilar.monopoly.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransactionService {

	@Autowired
	private TransactionRepository transactionRepository;

	@Autowired
	private AccountRepository accountRepository;

	public void transfer(Account sender, Account recipient, Integer amount) {
		var transaction = new Transaction();
		transaction.setSender(sender);
		transaction.setRecipient(recipient);
		transaction.setAmount(amount);

		sender.withdraw(amount);
		recipient.deposit(amount);

		accountRepository.saveAll(Arrays.asList(sender, recipient));
		transactionRepository.save(transaction);
	}
}
