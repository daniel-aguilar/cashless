package org.danielaguilar.cashless.repository;

import java.util.Optional;
import org.danielaguilar.cashless.model.Account;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends CrudRepository<Account, Integer> {
	Optional<Account> findByPin(String pin);
}
