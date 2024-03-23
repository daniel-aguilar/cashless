package org.danielaguilar.cashless.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Game {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

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
