package org.danielaguilar.cashless.repository;

import org.danielaguilar.cashless.model.Game;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends CrudRepository<Game, Integer> {}
