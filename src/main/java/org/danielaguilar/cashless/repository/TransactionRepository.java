package org.danielaguilar.cashless.repository;

import java.util.List;
import org.danielaguilar.cashless.model.Account;
import org.danielaguilar.cashless.model.Game;
import org.danielaguilar.cashless.model.Transaction;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Integer> {

	@Query("FROM Transaction "
         + "WHERE sender = ?1 OR recipient = ?1 "
         + "ORDER BY date DESC")
	List<Transaction> findLatestTransactions(Account account, Pageable page);

	@Query("FROM Transaction "
         + "WHERE sender.game = ?1 AND recipient.game = ?1 "
         + "ORDER BY date DESC")
	List<Transaction> findByGame(Game game);
}
