package org.danielaguilar.monopoly.controller;

import java.util.NoSuchElementException;
import java.util.Optional;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("bank/")
public class BankController {

	@Autowired
	private BankService bankService;

	@Autowired
	private AccountService accountService;

	public static class Transaction {
		private Integer from;
		private Integer to;
		private Integer amount;

		public Integer getFrom() {
			return from;
		}

		public void setFrom(Integer from) {
			this.from = from;
		}

		public Integer getTo() {
			return to;
		}

		public void setTo(Integer to) {
			this.to = to;
		}

		public Integer getAmount() {
			return amount;
		}

		public void setAmount(Integer amount) {
			this.amount = amount;
		}
	}

	@GetMapping("/")
	public Iterable<Bank> list() {
		return bankService.getBanks();
	}

	@PostMapping("new/")
	public void createBank(@RequestParam String name) {
		bankService.createBank(name);
	}

	@PostMapping("{bankId}/newAccount/")
	public Account createAccount(@PathVariable Integer bankId, @RequestParam String name) {
		Optional<Bank> bank = bankService.findBank(bankId);
		if (bank.isPresent()) {
			return bankService.createAccount(bank.get(), name);
		}
		throw new IllegalArgumentException(); // TODO: throw 404
	}

	@PostMapping("transfer/")
	public void makeTransaction(@RequestBody Transaction transaction) {
		try {
			Account from = accountService.findAccount(transaction.getFrom()).get();
			Account to = accountService.findAccount(transaction.getTo()).get();

			bankService.makeTransaction(from, to, transaction.getAmount());
		} catch (NoSuchElementException e) {
			throw e; // TODO: throw 404
		}
	}
}
