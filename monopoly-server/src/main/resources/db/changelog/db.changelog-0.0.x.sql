--liquibase formatted sql
--changeset Daniel Aguilar:1
CREATE TABLE bank (
  id SERIAL PRIMARY KEY,
  name VARCHAR(25) NOT NULL
);

CREATE TABLE account (
  id SERIAL PRIMARY KEY,
  bank_id INTEGER NOT NULL REFERENCES bank (id),
  name VARCHAR(25) NOT NULL,
  balance INTEGER NOT NULL
);

CREATE TABLE transaction (
  id SERIAL PRIMARY KEY,
  sender_id INTEGER NOT NULL REFERENCES account (id),
  recipient_id INTEGER NOT NULL REFERENCES account (id),
  amount INTEGER NOT NULL
);

--changeset Daniel Aguilar:1574545954 context:test
INSERT INTO bank VALUES (1, 'Bank 1');
INSERT INTO bank VALUES (2, 'Bank 2');

INSERT INTO account VALUES (1, 1, 'Player 1', 100);
INSERT INTO account VALUES (2, 1, 'Player 2', 100);
INSERT INTO account VALUES (3, 2, 'Player 3', 100);
