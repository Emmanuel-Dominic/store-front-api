/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS order_products (
    id SERIAL NOT NULL PRIMARY KEY,
    quantity INTEGER NOT NULL,
    order_id BIGINT NOT NULL REFERENCES orders(id),
    product_id BIGINT NOT NULL REFERENCES products(id)
);
