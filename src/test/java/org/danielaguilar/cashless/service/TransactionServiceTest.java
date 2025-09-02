package org.danielaguilar.cashless.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.danielaguilar.cashless.model.Account;
import org.danielaguilar.cashless.model.Transaction;
import org.danielaguilar.cashless.repository.AccountRepository;
import org.danielaguilar.cashless.repository.TransactionRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@ActiveProfiles("test")
public class TransactionServiceTest {

	@Autowired
	private AccountRepository accountRepository;

	@Autowired
	private TransactionService transactionService;

	@Autowired
	private TransactionRepository transactionRepository;

	@Test
	@Transactional
	public void testTransferAmount() {
		Transaction tx;
		Account banker = accountRepository.findById(2).orElseThrow();
		Account player = accountRepository.findById(3).orElseThrow();

		transactionService.transfer(banker, player, 30);

		assertEquals(70, banker.getBalance());
		assertEquals(130, player.getBalance());

		assertEquals(1, transactionRepository.count());
		tx = transactionRepository.findAll().getFirst();
		assertEquals(banker, tx.getSender());
		assertEquals(player, tx.getRecipient());
		assertEquals(30, tx.getAmount());
	}
}
