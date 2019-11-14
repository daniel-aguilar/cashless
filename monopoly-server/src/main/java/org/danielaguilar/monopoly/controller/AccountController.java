package org.danielaguilar.monopoly.controller;

import org.danielaguilar.monopoly.entity.Account;
import org.danielaguilar.monopoly.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("account/")
public class AccountController {

	@Autowired
	private AccountService accountService;

	@GetMapping("{accountId}/")
	public Account account(@PathVariable Integer accountId) {
		Optional<Account> query = accountService.findAccount(accountId);
		if (query.isPresent()) {
			return query.get();
		}
		throw new IllegalArgumentException(); // TODO: throw 404
	}
}
