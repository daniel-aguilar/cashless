package org.danielaguilar.monopoly.service;

import java.util.Optional;

import org.danielaguilar.monopoly.model.Account;
import org.danielaguilar.monopoly.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

	@Autowired
	private AccountRepository accountRepository;

	public Optional<Account> getAccount(Integer id) {
		return accountRepository.findById(id);
	}

	public Optional<Account> getAccount(String pin) {
		return accountRepository.findByPin(pin);
	}
}
