package org.danielaguilar.monopoly.repository;

import org.danielaguilar.monopoly.entity.Transaction;
import org.springframework.data.repository.CrudRepository;

public interface TransactionRepository extends CrudRepository<Transaction, Integer> {

}
