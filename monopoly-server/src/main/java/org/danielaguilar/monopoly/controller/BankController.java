package org.danielaguilar.monopoly.controller;

import java.util.Optional;

import org.danielaguilar.monopoly.entity.Account;
import org.danielaguilar.monopoly.entity.Bank;
import org.danielaguilar.monopoly.service.BankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("bank/")
public class BankController {

	@Autowired
	private BankService bankService;

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
}
