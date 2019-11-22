package org.danielaguilar.monopoly.controller;

import java.util.NoSuchElementException;

import org.danielaguilar.monopoly.model.Account;
import org.danielaguilar.monopoly.model.Bank;
import org.danielaguilar.monopoly.repository.AccountRepository;
import org.danielaguilar.monopoly.repository.BankRepository;
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
	private BankRepository bankRepository;

	@Autowired
	private AccountService accountService;

	@Autowired
	private AccountRepository accountRepository;

	public static class Transaction {
		@JsonProperty("from")
		public Integer sender;

		@JsonProperty("to")
		public Integer recipient;

		public Integer amount;
	}

	@GetMapping()
	public Iterable<Bank> getBanks() {
		return bankRepository.findAll();
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
			Account sender = accountRepository.findById(transaction.sender).get();
			Account recipient = accountRepository.findById(transaction.recipient).get();

			bankService.transferMoney(sender, recipient, transaction.amount);
		} catch (NoSuchElementException e) {
			throw e; // TODO: throw 404
		}
	}
}
