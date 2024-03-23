package org.danielaguilar.cashless.repository;

import org.danielaguilar.cashless.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
	Optional<Account> findByPin(String pin);
}
