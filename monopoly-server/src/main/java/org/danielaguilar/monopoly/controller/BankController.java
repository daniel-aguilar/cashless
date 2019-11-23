package org.danielaguilar.monopoly.controller;

import java.util.NoSuchElementException;

import org.danielaguilar.monopoly.model.Account;
import org.danielaguilar.monopoly.model.Bank;
import org.danielaguilar.monopoly.service.AccountService;
import org.danielaguilar.monopoly.service.BankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonProperty;

@RestController
@RequestMapping("bank/")
public class BankController {

	@Autowired
	private BankService bankService;

	@Autowired
	private AccountService accountService;

	public static class Transaction {
		@JsonProperty("from")
		public Integer sender;

		@JsonProperty("to")
		public Integer recipient;

		public Integer amount;
	}

	@GetMapping()
	public Iterable<Bank> getBanks() {
		return bankService.getBanks();
	}

	@PostMapping("new/")
	public void createBank(String name) {
		bankService.createBank(name);
	}

	@GetMapping("{id}/accounts/")
	public Iterable<Account> getAccounts(@PathVariable("id") Bank bank) {
		return bank.getAccounts();
	}

	@PostMapping("{id}/new-account/")
	public Account createAccount(@PathVariable("id") Bank bank, String name) {
		return accountService.createAccount(bank, name);
	}

	@PostMapping("transfer/")
	public void transferMoney(@RequestBody Transaction transaction) {
		try {
			Account sender = accountService.getAccount(transaction.sender).get();
			Account recipient = accountService.getAccount(transaction.recipient).get();

			bankService.transferMoney(sender, recipient, transaction.amount);
		} catch (NoSuchElementException e) {
			throw e; // TODO: throw 404
		}
	}
}
