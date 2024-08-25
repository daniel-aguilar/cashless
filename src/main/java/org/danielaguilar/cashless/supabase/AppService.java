package org.danielaguilar.cashless.supabase;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AppService {
	private static final Logger logger = LogManager.getLogger();

	@Autowired
	private JdbcTemplate jdbc;

	@Async
	@Transactional
	public void preventPausing() {
		SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbc);
		jdbcCall.withFunctionName("fn_prevent_pausing");
		int result = jdbcCall.executeFunction(Integer.class);
		logger.info(result);
	}
}
