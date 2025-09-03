package org.danielaguilar.cashless.controller;

import java.util.List;
import org.danielaguilar.cashless.model.Account;
import org.danielaguilar.cashless.model.Game;
import org.danielaguilar.cashless.model.Transaction;
import org.danielaguilar.cashless.service.AccountService;
import org.danielaguilar.cashless.service.GameService;
import org.danielaguilar.cashless.service.TransactionService;
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

  @Autowired private GameService gameService;
  @Autowired private AccountService accountService;
  @Autowired private TransactionService txService;

  @PostMapping("/new")
  public Account newGame(String bankerName) {
    return gameService.createGame(bankerName);
  }

  @PostMapping("/join")
  public Account joinGame(String pin) {
    var accountQuery = accountService.getAccount(pin);
    if (accountQuery.isPresent()) {
      return accountQuery.get();
    }
    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No account found");
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

  @GetMapping("/{id}/transactions")
  public List<Transaction> getTransactions(@PathVariable("id") Game game) {
    return txService.getTransactions(game);
  }
}
