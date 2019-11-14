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
