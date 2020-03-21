package org.danielaguilar.monopoly.model;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class AccountTest {

	private Account account;

	@BeforeEach
	public void setUp() {
		account = new Account();
		account.setBalance(100);
	}

	@Test
	public void testWithdrawBalance() {
		account.withdraw(80);
		assertEquals(20, account.getBalance());
	}

	@Test
	public void testNegativeBalance() {
		assertThrows(IllegalArgumentException.class, () -> account.withdraw(110));
	}
	
	@Test
	public void testGeneratePin() {
		assertEquals(account.getPin().length(), 4);
		Integer.parseInt(account.getPin());
	}
}
