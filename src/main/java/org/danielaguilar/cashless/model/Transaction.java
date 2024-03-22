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
		public Integer amount;

		@JsonProperty("to")
		public Integer recipientId;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "sender_id")
	private Account sender;

	@ManyToOne
	@JoinColumn(name = "recipient_id")
	private Account recipient;

	private Integer amount;

	@Column(name = "exchange_date")
	private ZonedDateTime date = ZonedDateTime.now();
}
