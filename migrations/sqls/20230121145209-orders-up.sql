/* Replace with your SQL commands */
DO $$ BEGIN
    CREATE TYPE order_status AS ENUM ('open', 'closed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL NOT NULL PRIMARY KEY,
    status order_status NOT NULL,
    user_id BIGINT NOT NULL REFERENCES users(id)
);
