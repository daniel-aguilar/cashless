package org.danielaguilar.monopoly.repository;

import org.danielaguilar.monopoly.model.Bank;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BankRepository extends CrudRepository<Bank, Integer> {

}
