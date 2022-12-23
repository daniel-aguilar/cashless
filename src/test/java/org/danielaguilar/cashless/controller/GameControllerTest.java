package org.danielaguilar.cashless.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
public class GameControllerTest {

	@Autowired
	private MockMvc mvc;

	@Test
	public void testAccountNotFound() throws Exception {
		mvc.perform(post("/game/join").param("pin", "6762")).andExpect(status().isNotFound())
				.andExpect(status().reason("No account found"));
	}
}
