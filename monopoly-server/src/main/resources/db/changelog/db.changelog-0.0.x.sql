--liquibase formatted sql
--changeset Daniel Aguilar:1
CREATE TABLE game (
  id SERIAL PRIMARY KEY,
  name VARCHAR(25) NOT NULL
);

CREATE TABLE account (
  id SERIAL PRIMARY KEY,
  game_id INTEGER NOT NULL REFERENCES game (id),
  name VARCHAR(25) NOT NULL,
  balance INTEGER NOT NULL,
  pin CHAR(4) NOT NULL
);

ALTER TABLE game
ADD COLUMN bank_id INTEGER REFERENCES account (id),
ADD COLUMN banker_id INTEGER REFERENCES account (id);

CREATE TABLE transaction (
  id SERIAL PRIMARY KEY,
  sender_id INTEGER NOT NULL REFERENCES account (id),
  recipient_id INTEGER NOT NULL REFERENCES account (id),
  amount INTEGER NOT NULL
);
