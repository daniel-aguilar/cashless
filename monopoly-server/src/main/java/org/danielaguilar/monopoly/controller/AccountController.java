package org.danielaguilar.monopoly.controller;

import org.danielaguilar.monopoly.model.Account;
import org.danielaguilar.monopoly.model.Transaction;
import org.danielaguilar.monopoly.service.AccountService;
import org.danielaguilar.monopoly.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("account/")
public class AccountController {

	@Autowired
	private AccountService accountService;

	@Autowired
	private TransactionService transactionService;

	@GetMapping("{id}/balance/")
	public Integer getBalance(@PathVariable("id") Account account) {
		return account.getBalance();
	}

	@PostMapping("{id}/transfer/")
	public void transfer(@PathVariable("id") Account sender, @RequestBody Transaction.JSON transaction) {
		Account recipient = accountService.getAccount(transaction.recipientId).get();
		transactionService.transfer(sender, recipient, transaction.amount);
	}
}
