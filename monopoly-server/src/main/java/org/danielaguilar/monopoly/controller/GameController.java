package org.danielaguilar.monopoly.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
	public Map<String, Object> joinGame(String pin) {
		var response = new HashMap<String, Object>();
		var account = accountService.getAccount(pin).get();

		response.put("account", account);
		response.put("gameId", account.getGame().getId());
		return response;
	}

	@GetMapping("/game/{id}/players/")
	public List<Account> getPlayers(@PathVariable("id") Game game) {
		return game.getAccounts();
	}
}
