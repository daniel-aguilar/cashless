package org.danielaguilar.monopoly.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.danielaguilar.monopoly.repository.GameRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@ActiveProfiles("test")
public class AccountServiceTest {

	@Autowired
	private GameRepository gameRepository;

	@Autowired
	private AccountService accountService;

	@Test
	@Transactional
	public void testCreateBankAccount() {
		var game = gameRepository.findById(2).get();
		var bank = accountService.createBankAccount(game);
		assertEquals("Bank", bank.getName());
		assertEquals(1000000, bank.getBalance());
	}
}
