package org.danielaguilar.cashless.controller;

import java.util.List;

import org.danielaguilar.cashless.model.Account;
import org.danielaguilar.cashless.model.Transaction;
import org.danielaguilar.cashless.service.AccountService;
import org.danielaguilar.cashless.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/account")
public class AccountController {

	@Autowired
	private AccountService accountService;

	@Autowired
	private TransactionService transactionService;

	@Autowired
	private SimpMessagingTemplate template;

	@GetMapping("/{id}/balance")
	public Integer getBalance(@PathVariable("id") Account account) {
		return account.getBalance();
	}

	@PostMapping("/{id}/transfer")
	public void transfer(@PathVariable("id") Account sender, @RequestBody Transaction.JSON transaction) {
		try {
			Account recipient = accountService.getAccount(transaction.recipientId);
			Transaction tx = transactionService.transfer(sender, recipient, transaction.amount);
			template.convertAndSend("/queue/transactions", tx);
		} catch (IllegalArgumentException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}

	@GetMapping("/{id}/transactions")
	public List<Transaction> getLatestTransactions(@PathVariable("id") Account account) {
		return transactionService.getLatestTransactions(account);
	}
}
