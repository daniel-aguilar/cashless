package org.danielaguilar.cashless.service;

import org.danielaguilar.cashless.model.Account;
import org.danielaguilar.cashless.model.Game;
import org.danielaguilar.cashless.model.Transaction;
import org.danielaguilar.cashless.repository.AccountRepository;
import org.danielaguilar.cashless.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class TransactionService {

	@Autowired
	private TransactionRepository transactionRepository;

	@Autowired
	private AccountRepository accountRepository;

	public Transaction transfer(Account sender, Account recipient, Integer amount) {
		var tx = new Transaction();
		tx.setSender(sender);
		tx.setRecipient(recipient);
		tx.setAmount(amount);

		sender.withdraw(amount);
		recipient.deposit(amount);

		accountRepository.saveAll(Arrays.asList(sender, recipient));
		return transactionRepository.save(tx);
	}

	public List<Transaction> getLatestTransactions(Account account) {
		PageRequest page = PageRequest.of(0, 3);
		return transactionRepository.findLatestTransactions(account, page);
	}

	public List<Transaction> getTransactions(Game game) {
		return transactionRepository.findByGame(game);
	}
}
