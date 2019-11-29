package org.danielaguilar.monopoly.controller;

import java.util.List;

import org.danielaguilar.monopoly.model.Account;
import org.danielaguilar.monopoly.model.Game;
import org.danielaguilar.monopoly.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

	@GetMapping("/game/{id}/players/")
	public List<Account> getPlayers(@PathVariable("id") Game game) {
		return game.getAccounts();
	}
}
