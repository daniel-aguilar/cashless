package org.danielaguilar.cashless.model;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.apache.commons.lang3.StringUtils;
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
		assertEquals(4, account.getPin().length());
		assertTrue(StringUtils.isNumeric(account.getPin()));
	}
}
