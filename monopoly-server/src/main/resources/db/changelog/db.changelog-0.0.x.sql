--liquibase formatted sql
--changeset Daniel Aguilar:1573536677
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
