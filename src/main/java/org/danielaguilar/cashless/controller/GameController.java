package org.danielaguilar.cashless.controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.danielaguilar.cashless.model.Account;
import org.danielaguilar.cashless.model.Game;
import org.danielaguilar.cashless.service.AccountService;
import org.danielaguilar.cashless.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/game")
public class GameController {

	@Autowired
	private GameService gameService;

	@Autowired
	private AccountService accountService;

	@PostMapping("/new")
	public Account newGame(String bankerName) {
		return gameService.createGame(bankerName);
	}

	@PostMapping("/join")
	public Account joinGame(String pin) {
		try {
			return accountService.getAccount(pin).get();
		} catch (NoSuchElementException e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No account found");
		}
	}

	@GetMapping("/{id}/players")
	public List<Account> getPlayers(@PathVariable("id") Game game) {
		return game.getAccounts();
	}

	@PostMapping("/{id}/players/add")
	public Account addPlayer(@PathVariable("id") Game game, String playerName) {
		return accountService.addAccount(playerName, game);
	}

	@GetMapping("/{id}/bank")
	public Account getBank(@PathVariable("id") Game game) {
		return game.getBank();
	}
}
