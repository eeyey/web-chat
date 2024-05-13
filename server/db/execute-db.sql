CREATE TABLE IF NOT EXISTS Users (
  id serial PRIMARY KEY,
  name VARCHAR(30),
  email VARCHAR(40) UNIQUE,
  password VARCHAR(64)
);

CREATE TABLE IF NOT EXISTS messages (
	id serial PRIMARY KEY,
  sender_id INTEGER REFERENCES users (id) NOT NULL,
  receiver_id INTEGER REFERENCES users (id) NOT NULL,
  text TEXT  NOT NULL,
  created_at BIGINT NOT NULL,
  updated_at BIGINT
);





-- insert into
-- users (name, email, password) 
-- VALUES 
-- ('user1', 'user1@gmail.com', '$2b$04$oEsm67mW/aQVK5MVItaGDOUb21H4yMUyxZUI2jnQu.QHkljGyJ/pe'),
-- ('user2', 'user2@gmail.com', '$2b$04$NU95U0a/jnX4/988VMA2KOcGlziyu2fhbNAmPooOK7MtrPdHjeH3u'),
-- ('user3', 'user3@gmail.com', '$2b$04$aVZqLfQKRL4YhX0KrEGaJ.loC8ZJmzW5u1DcCzkYKbUABQPLpCkpG');

-- insert into
-- messages (sender_id, receiver_id, text, created_at, updated_at) 
-- VALUES 
-- (1, 2, 'Привет, user2. Как твои дела?', 1673286802113, 1673286802113),
-- (2, 1, 'Привет, user1. У меня все здорово. Ты как?', 1673286902113, 1673286902113),
-- (1, 1, 'У меня точно так же. Вот пишу веб-чат...', 1673287002113, 1673287002113),
-- (2, 1, 'Ого, и как успехи?', 1673287124123, 1673287124123),
-- (1, 3, 'Привет, user3. Ты новенький?', 1673288124123, 1673288124123),
-- (2, 3, 'Добро пожаловать :)', 1673258124123, 1673258124123);


