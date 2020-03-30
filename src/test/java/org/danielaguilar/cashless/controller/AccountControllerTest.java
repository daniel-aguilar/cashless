package org.danielaguilar.cashless.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.danielaguilar.cashless.model.Transaction;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
public class AccountControllerTest {

	@Autowired
	private ObjectMapper mapper;

	@Autowired
	private MockMvc mvc;

	@Test
	public void testInsufficientFunds() throws Exception {
		var tx = new Transaction.JSON();
		tx.amount = 110;
		tx.recipientId = 3;
		var json = mapper.writeValueAsString(tx);

		mvc.perform(post("/account/2/transfer/").content(json).contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isBadRequest());
	}
}
