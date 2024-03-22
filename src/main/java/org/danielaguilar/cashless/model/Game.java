package org.danielaguilar.cashless.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.OrderBy;

@Entity
@Getter
@Setter
public class Game {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@OneToOne
	@JoinColumn(name = "bank_id")
	private Account bank;

	@OneToOne
	@JoinColumn(name = "banker_id")
	private Account banker;

	@OneToMany(mappedBy = "game")
	@OrderBy("name ASC")
	private List<Account> accounts;
}
