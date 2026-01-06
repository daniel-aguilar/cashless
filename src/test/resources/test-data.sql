INSERT INTO game (id) VALUES (1);
INSERT INTO game (id) VALUES (2);

INSERT INTO account (id, game_id, account_name, balance, pin)
VALUES (1, 1, 'Bank', 1000, '0000');
INSERT INTO account (id, game_id, account_name, balance, pin)
VALUES (2, 1, 'Banker', 100, '1234');
INSERT INTO account (id, game_id, account_name, balance, pin)
VALUES (3, 1, 'Player', 100, '4321');

UPDATE game SET bank_id = 1, banker_id = 2 WHERE id = 1;

ALTER TABLE game ALTER COLUMN id RESTART WITH 3;
ALTER TABLE account ALTER COLUMN id RESTART WITH 4;
