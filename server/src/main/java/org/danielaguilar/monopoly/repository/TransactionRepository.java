package org.danielaguilar.monopoly.repository;

import java.util.List;

import org.danielaguilar.monopoly.model.Account;
import org.danielaguilar.monopoly.model.Transaction;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends PagingAndSortingRepository<Transaction, Integer> {

	@Query("FROM Transaction "
         + "WHERE sender = ?1 OR recipient = ?1 "
         + "ORDER BY date DESC")
	List<Transaction> findLastestTransactions(Account account, Pageable page);
}
