package org.danielaguilar.cashless.controller;

import com.fasterxml.jackson.annotation.JsonProperty;

public record TransactionRequest(int amount, @JsonProperty("to") int recipientId) {}
