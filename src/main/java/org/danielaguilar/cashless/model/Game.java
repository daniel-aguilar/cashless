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

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Account getBank() {
		return bank;
	}

	public void setBank(Account bank) {
		this.bank = bank;
	}

	public Account getBanker() {
		return banker;
	}

	public void setBanker(Account banker) {
		this.banker = banker;
	}

	public List<Account> getAccounts() {
		return accounts;
	}

	public void setAccounts(List<Account> accounts) {
		this.accounts = accounts;
	}
}
