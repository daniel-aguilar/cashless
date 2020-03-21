package org.danielaguilar.monopoly.service;

import java.util.Arrays;
import java.util.List;

import org.danielaguilar.monopoly.model.Account;
import org.danielaguilar.monopoly.model.Transaction;
import org.danielaguilar.monopoly.repository.AccountRepository;
import org.danielaguilar.monopoly.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class TransactionService {

	@Autowired
	private TransactionRepository transactionRepository;

	@Autowired
	private AccountRepository accountRepository;

	public Transaction transfer(Account sender, Account recipient, Integer amount) {
		var transaction = new Transaction();
		transaction.setSender(sender);
		transaction.setRecipient(recipient);
		transaction.setAmount(amount);

		sender.withdraw(amount);
		recipient.deposit(amount);

		accountRepository.saveAll(Arrays.asList(sender, recipient));
		return transactionRepository.save(transaction);
	}

	public List<Transaction> getLastestTransactions(Account account) {
		PageRequest page = PageRequest.of(0, 3);
		return transactionRepository.findLastestTransactions(account, page);
	}
}
