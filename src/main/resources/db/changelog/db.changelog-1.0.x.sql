--liquibase formatted sql
--changeset Daniel Aguilar:1.0.0
CREATE TABLE game (
  id SERIAL PRIMARY KEY
);

CREATE TABLE account (
  id SERIAL PRIMARY KEY,
  game_id INTEGER NOT NULL REFERENCES game (id),
  name VARCHAR(25) NOT NULL,
  balance INTEGER NOT NULL,
  pin CHAR(4) NOT NULL,
  UNIQUE(game_id, name)
);

-- Common syntax for Postgres & H2
ALTER TABLE game ADD COLUMN bank_id INTEGER REFERENCES account (id);
ALTER TABLE game ADD COLUMN banker_id INTEGER REFERENCES account (id);

CREATE TABLE transaction (
  id SERIAL PRIMARY KEY,
  sender_id INTEGER NOT NULL REFERENCES account (id),
  recipient_id INTEGER NOT NULL REFERENCES account (id),
  amount INTEGER NOT NULL,
  date TIMESTAMP NOT NULL
);

--changeset Daniel Aguilar:1574640900 context:test
INSERT INTO game (id) VALUES (1);
INSERT INTO game (id) VALUES (2);

INSERT INTO account VALUES (1, 1, 'Bank', 1000, '0000');
INSERT INTO account VALUES (2, 1, 'Banker', 100, '1234');
INSERT INTO account VALUES (3, 1, 'Player', 100, '4321');

UPDATE game SET bank_id = 1, banker_id = 2 WHERE id = 1;
