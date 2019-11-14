package org.danielaguilar.monopoly.controller;

import java.util.Optional;

import org.danielaguilar.monopoly.entity.Bank;
import org.danielaguilar.monopoly.service.BankService;
import org.springframework.beans.factory.annotation.Autowired;
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

	@PostMapping("new/")
	public void createBank(@RequestParam String name) {
		bankService.createBank(name);
	}

	@PostMapping("{bankId}/newAccount/")
	public void createAccount(@PathVariable Integer bankId, @RequestParam String name) {
		Optional<Bank> bank = bankService.findBank(bankId);
		if (bank.isPresent()) {
			bankService.createAccount(bank.get(), name);
		} // TODO: else throw 404
	}
}
