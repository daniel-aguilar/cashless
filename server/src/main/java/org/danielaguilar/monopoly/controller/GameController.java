package org.danielaguilar.monopoly.controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.danielaguilar.monopoly.model.Account;
import org.danielaguilar.monopoly.model.Game;
import org.danielaguilar.monopoly.service.AccountService;
import org.danielaguilar.monopoly.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class GameController {

	@Autowired
	private GameService gameService;

	@Autowired
	private AccountService accountService;

	@PostMapping("/new/")
	public Account newGame(String bankerName) {
		return gameService.createGame(bankerName);
	}

	@PostMapping("/join/")
	public Account joinGame(String pin) {
		try {
			return accountService.getAccount(pin).get();
		} catch (NoSuchElementException e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No account found");
		}
	}

	@GetMapping("/game/{id}/players/")
	public List<Account> getPlayers(@PathVariable("id") Game game) {
		return game.getAccounts();
	}

	@PostMapping("/game/{id}/players/add/")
	public Account addPlayer(@PathVariable("id") Game game, String playerName) {
		return accountService.addAccount(playerName, game);
	}

	@GetMapping("/game/{id}/bank/")
	public Account getBank(@PathVariable("id") Game game) {
		return game.getBank();
	}
}
