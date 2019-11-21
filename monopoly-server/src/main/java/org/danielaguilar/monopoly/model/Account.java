package org.danielaguilar.monopoly.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Account {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String name;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "bank_id")
	private Bank bank;

	@JsonIgnore
	private Integer balance = 0;

	public void deposit(Integer amount) {
		balance += amount;
	}

	public void withdraw(Integer amount) {
		if (balance - amount >= 0) {
			balance -= amount;
		} else {
			// TODO: Find more appropriate exception
			throw new IllegalArgumentException();
		}
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Bank getBank() {
		return bank;
	}

	public void setBank(Bank bank) {
		this.bank = bank;
	}

	public Integer getBalance() {
		return balance;
	}

	public void setBalance(Integer balance) {
		this.balance = balance;
	}
}
