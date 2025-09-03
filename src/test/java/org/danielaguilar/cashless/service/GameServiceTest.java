package org.danielaguilar.cashless.service;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@ActiveProfiles("test")
public class GameServiceTest {

  @Autowired private GameService gameService;

  @Test
  @Transactional
  public void testCreateGame() {
    var banker = gameService.createGame("Rich Uncle Pennybags");
    assertTrue(banker.isBanker());
  }
}
