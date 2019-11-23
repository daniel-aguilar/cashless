package org.danielaguilar.monopoly.repository;

import org.danielaguilar.monopoly.model.Account;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends CrudRepository<Account, Integer> {

}
