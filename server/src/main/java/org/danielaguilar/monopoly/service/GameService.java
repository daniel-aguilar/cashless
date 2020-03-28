package org.danielaguilar.monopoly.service;

import org.danielaguilar.monopoly.model.Account;
import org.danielaguilar.monopoly.model.Game;
import org.danielaguilar.monopoly.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class GameService {

	@Autowired
	private GameRepository gameRepository;

	@Autowired
	private AccountService accountService;

	@Transactional
	public Account createGame(String bankerName) {
		var game = new Game();
		Account bank;
		Account banker;

		game = gameRepository.save(game);
		bank = accountService.createBankAccount(game);
		banker = accountService.addAccount(bankerName, game);

		game.setBank(bank);
		game.setBanker(banker);
		gameRepository.save(game);

		return banker;
	}
}
