package org.danielaguilar.monopoly.controller;

import org.danielaguilar.monopoly.model.Account;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("account/")
public class AccountController {

	@GetMapping("{id}/")
	public Account getAccount(@PathVariable("id") Account account) {
		return account;
	}

	@GetMapping("{id}/balance/")
	public Integer getBalance(@PathVariable("id") Account account) {
		return account.getBalance();
	}
}
