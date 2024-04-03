package org.danielaguilar.cashless.service;

import org.danielaguilar.cashless.model.Account;
import org.danielaguilar.cashless.model.Game;
import org.danielaguilar.cashless.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountService {

	@Autowired
	private AccountRepository accountRepository;

	public Optional<Account> getAccount(int id) {
		return accountRepository.findById(id);
	}

	public Optional<Account> getAccount(String pin) {
		return accountRepository.findByPin(pin);
	}

	public Account addAccount(String name, Game game) {
		var account = new Account();
		account.setName(name);
		account.setGame(game);

		return accountRepository.save(account);
	}

	public Account createBankAccount(Game game) {
		var account = new Account();
		account.setName("Bank");
		account.setGame(game);
		account.setBalance(1000000);

		return accountRepository.save(account);
	}
}
