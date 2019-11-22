--liquibase formatted sql
--changeset Daniel Aguilar:1573536677
CREATE TABLE bank (
  id SERIAL PRIMARY KEY,
  name VARCHAR(25) NOT NULL
);

CREATE TABLE account (
  id SERIAL PRIMARY KEY,
  bank_id INTEGER REFERENCES bank (id) NOT NULL,
  name VARCHAR(25) NOT NULL,
  balance INTEGER NOT NULL
);

CREATE TABLE transaction (
  id SERIAL PRIMARY KEY,
  sender_id INTEGER REFERENCES account (id) NOT NULL,
  recipient_id INTEGER REFERENCES account (id) NOT NULL,
  amount INTEGER NOT NULL
);
