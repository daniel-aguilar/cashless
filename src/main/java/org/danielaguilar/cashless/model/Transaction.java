package org.danielaguilar.cashless.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.ZonedDateTime;
import lombok.Getter;
import lombok.Setter;

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
