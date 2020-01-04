package org.danielaguilar.monopoly.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest(properties = "spring.profiles.active = test")
@AutoConfigureMockMvc
public class GameControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@Test
	public void testGetBankAccount() throws Exception {
		this.mockMvc.perform(get("/game/1/bank/"))
			.andExpect(content().contentType("application/json"))
			.andExpect(jsonPath("$.id").value(1));
	}
}
