package org.danielaguilar.cashless.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.util.Random;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Account {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "game_id")
	private Game game;

	@Column(name = "account_name")
	private String name;

	@JsonIgnore
	private int balance = 1500;

	@EqualsAndHashCode.Include
	private String pin;

	public Account() {
		generatePin();
	}

	public int getGameId() {
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

	public void deposit(int amount) {
		balance += amount;
	}

	public void withdraw(int amount) {
		if (balance - amount >= 0) {
			balance -= amount;
		} else {
			throw new IllegalArgumentException("Non-Sufficient Funds");
		}
	}

	private void generatePin() {
		Random rand = new Random();
		int number = rand.nextInt(10000);
		pin = String.format("%04d", number);
	}
}
