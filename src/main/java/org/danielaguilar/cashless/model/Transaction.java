package org.danielaguilar.cashless.model;

import java.time.ZonedDateTime;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "exchange")
@Getter
@Setter
public class Transaction {

	public static class JSON {
		public int amount;

		@JsonProperty("to")
		public int recipientId;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@ManyToOne
	@JoinColumn(name = "sender_id")
	private Account sender;

	@ManyToOne
	@JoinColumn(name = "recipient_id")
	private Account recipient;

	private int amount;

	@Column(name = "exchange_date")
	private final ZonedDateTime date = ZonedDateTime.now();
}
