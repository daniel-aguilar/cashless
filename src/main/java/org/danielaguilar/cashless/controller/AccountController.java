package org.danielaguilar.cashless.controller;

import org.danielaguilar.cashless.model.Account;
import org.danielaguilar.cashless.model.Transaction;
import org.danielaguilar.cashless.service.AccountService;
import org.danielaguilar.cashless.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

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
	public int getBalance(@PathVariable("id") Account account) {
		return account.getBalance();
	}

	@PostMapping("/{id}/transfer")
	public void transfer(@PathVariable("id") Account sender, @RequestBody Transaction.JSON transaction) {
		try {
			Account recipient = accountService.getAccount(transaction.recipientId).get();
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
