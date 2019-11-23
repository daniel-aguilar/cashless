package org.danielaguilar.monopoly.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
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
public class BankServiceTest {

	@Autowired
	private BankService bankService;

	@Autowired
	private AccountRepository accountRepository;

	@MockBean
	private TransactionRepository transactionRepository;

	@Test
	public void testTransferMoney() {
		Account account1 = accountRepository.findById(1).get();
		Account account2 = accountRepository.findById(2).get();

		bankService.transferMoney(account1, account2, 80);

		assertEquals(20, account1.getBalance());
		assertEquals(180, account2.getBalance());
		verify(transactionRepository).save(any(Transaction.class));
	}

	@Test
	public void testTransferFromAnotherBank() {
		Account account1 = accountRepository.findById(1).get();
		Account account2 = accountRepository.findById(3).get();

		assertThrows(IllegalArgumentException.class, () ->
			bankService.transferMoney(account1, account2, 80)
		);
	}
}
