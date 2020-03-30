package org.danielaguilar.cashless.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

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
