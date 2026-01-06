package org.danielaguilar.cashless.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.danielaguilar.cashless.repository.GameRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@ActiveProfiles("test")
public class AccountServiceTest {

  @Autowired private GameRepository gameRepository;
  @Autowired private AccountService accountService;

  @Test
  @Transactional
  @Sql("/test-data.sql")
  public void testCreateBankAccount() {
    var game = gameRepository.findById(2).orElseThrow();
    var bank = accountService.createBankAccount(game);
    assertEquals("Bank", bank.getName());
    assertEquals(1000000, bank.getBalance());
  }
}
