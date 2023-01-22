/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS products (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(64) NOT NULL UNIQUE,
    price INTEGER NOT NULL
);
