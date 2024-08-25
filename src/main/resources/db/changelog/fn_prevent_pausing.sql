--liquibase formatted sql
--precondition-dbms type:postgresql
--changeset Daniel Aguilar:fn_prevent_pausing dbms:postgresql runOnChange:true
CREATE OR REPLACE function fn_prevent_pausing()
RETURNS SMALLINT
LANGUAGE plpgsql
AS $$
	BEGIN
		RAISE NOTICE 'initializing...';
		PERFORM pg_sleep_for('45 seconds');
		RAISE NOTICE 'done';
		RETURN
			COUNT(*) FROM exchange
			WHERE
				exchange_date BETWEEN
					(CURRENT_TIMESTAMP - INTERVAL '7 day') AND
					CURRENT_TIMESTAMP;
	END;
$$;
/
