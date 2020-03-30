package org.danielaguilar.cashless.model;

import java.util.Objects;
import java.util.Random;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class Account {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "game_id")
	private Game game;

	private String name;

	@JsonIgnore
	private Integer balance = 1500;

	private String pin;

	public Account() {
		generatePin();
	}

	public Integer getGameId() {
		return game.getId();
	}

	@JsonProperty("isBank")
	public Boolean isBank() {
		return game.getBank().equals(this);
	}

	@JsonProperty("isBanker")
	public Boolean isBanker() {
		return game.getBanker().equals(this);
	}

	public void deposit(Integer amount) {
		balance += amount;
	}

	public void withdraw(Integer amount) {
		if (balance - amount >= 0) {
			balance -= amount;
		} else {
			throw new IllegalArgumentException("Non-Sufficient Funds");
		}
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Game getGame() {
		return game;
	}

	public void setGame(Game game) {
		this.game = game;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getBalance() {
		return balance;
	}

	public void setBalance(Integer balance) {
		this.balance = balance;
	}

	public String getPin() {
		return pin;
	}

	public void setPin(String pin) {
		this.pin = pin;
	}

	@Override
	public int hashCode() {
		return Objects.hash(pin);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (!(obj instanceof Account)) {
			return false;
		}
		Account other = (Account) obj;
		return Objects.equals(pin, other.pin);
	}

	private void generatePin() {
		Random rand = new Random();
		int number = rand.nextInt(10000);
		pin = String.format("%04d", number);
	}
}
