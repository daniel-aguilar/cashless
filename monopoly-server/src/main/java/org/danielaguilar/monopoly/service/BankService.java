package org.danielaguilar.monopoly.service;

import java.util.Optional;

import org.danielaguilar.monopoly.entity.Bank;
import org.danielaguilar.monopoly.entity.Account;
import org.danielaguilar.monopoly.repository.BankRepository;
import org.danielaguilar.monopoly.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BankService {

	@Autowired
	private BankRepository bankRepository;

	@Autowired
	private AccountRepository accountRepository;

	public Bank createBank(String name) {
		Bank bank = new Bank(name);
		return bankRepository.save(bank);
	}

	public Optional<Bank> findBank(Integer bankId) {
		return bankRepository.findById(bankId);
	}

	public void createAccount(Bank bank, String name) {
		Account newAccount = new Account();
		newAccount.setName(name);
		newAccount.setBank(bank);
		accountRepository.save(newAccount);
	}
}
