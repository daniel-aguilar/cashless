package org.danielaguilar.monopoly.service;

import org.danielaguilar.monopoly.entity.Account;
import org.danielaguilar.monopoly.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountService {

	@Autowired
	private AccountRepository accountRepository;

	public Iterable<Account> getAccounts() {
		return accountRepository.findAll();
	}

	public Optional<Account> findAccount(Integer accountId) {
		return accountRepository.findById(accountId);
	}
}
