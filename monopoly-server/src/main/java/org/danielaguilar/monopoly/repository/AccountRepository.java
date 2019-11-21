package org.danielaguilar.monopoly.repository;

import org.danielaguilar.monopoly.model.Account;
import org.springframework.data.repository.CrudRepository;

public interface AccountRepository extends CrudRepository<Account, Integer> {

}
