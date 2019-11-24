package org.danielaguilar.monopoly.controller;

import org.danielaguilar.monopoly.model.Account;
import org.danielaguilar.monopoly.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GameController {

	@Autowired
	private AccountService accountService;
	
	@PostMapping("/join/")
	public Account joinGame(String pin) {
		return accountService.getAccount(pin).get();
	}
}
