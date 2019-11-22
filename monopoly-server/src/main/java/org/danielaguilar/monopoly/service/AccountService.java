package org.danielaguilar.monopoly.service;

import org.danielaguilar.monopoly.model.Account;
import org.danielaguilar.monopoly.model.Bank;
import org.danielaguilar.monopoly.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

	@Autowired
	private AccountRepository accountRepository;

	public Account createAccount(Bank bank, String name) {
		Account newAccount = new Account();
		newAccount.setName(name);
		newAccount.setBank(bank);
		return accountRepository.save(newAccount);
	}
}
