CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    question VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS answers (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    question_id INT NOT NULL,
    answer TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    UNIQUE (user_id, question_id, answer)
);

-- test data
INSERT INTO users (name, email) VALUES
  ('Richard Martinez', 'r.martinezdk@gmail.com'),
  ('Homer Simpson', 'homer@hotmail.com'),
  ('Lionel Messi', 'messi@hotmail.com');

