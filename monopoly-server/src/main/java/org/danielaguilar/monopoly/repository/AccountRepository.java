package org.danielaguilar.monopoly.repository;

import org.danielaguilar.monopoly.entity.Account;
import org.springframework.data.repository.CrudRepository;

public interface AccountRepository extends CrudRepository<Account, Integer> {

}
