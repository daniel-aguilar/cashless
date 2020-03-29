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
	}

	@Test
	public void testDefaultValues() {
		assertEquals(1500, account.getBalance());
	}

	@Test
	public void testWithdrawBalance() {
		account.setBalance(100);
		account.withdraw(80);
		assertEquals(20, account.getBalance());
	}

	@Test
	public void testNegativeBalance() {
		account.setBalance(100);
		assertThrows(IllegalArgumentException.class, () -> account.withdraw(110));
	}

	@Test
	public void testGeneratePin() {
		assertEquals(account.getPin().length(), 4);
		Integer.parseInt(account.getPin());
	}
}
