package org.danielaguilar.monopoly.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;

import org.danielaguilar.monopoly.model.Account;
import org.danielaguilar.monopoly.model.Transaction;
import org.danielaguilar.monopoly.repository.AccountRepository;
import org.danielaguilar.monopoly.repository.TransactionRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

@SpringBootTest(properties = "spring.profiles.active = test")
public class TransactionServiceTest {

	@Autowired
	private AccountRepository accountRepository;

	@Autowired
	private TransactionService transactionService;

	@MockBean
	private TransactionRepository transactionRepository;

	@Test
	public void testTransferAmount() {
		Account banker = accountRepository.findById(2).get();
		Account player = accountRepository.findById(3).get();

		transactionService.transfer(banker, player, 30);

		assertEquals(70, banker.getBalance());
		assertEquals(130, player.getBalance());
		verify(transactionRepository).save(any(Transaction.class));
	}
}
