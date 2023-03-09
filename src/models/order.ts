import db from './../Config/database';

export interface Order {
    id?: string;
    status: string;
    userId: string;
}

export class OrderStore {
    async index(userId: string): Promise<Order[]> {
        try {
            const conn = await db.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=$1';
            const result = await db.query(sql, [userId]);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error('Unable to get orders: ' + String(error));
        }
    }

    async show(id: string): Promise<Order> {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const conn = await db.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error('Could not find order ' + String(id) + ' Error: ' + String(error));
        }
    }

    async create(id: string): Promise<Order> {
        try {
            const conn = await db.connect();
            const sql = `INSERT INTO "orders" ("status", "user_id") VALUES('open', '${id}') RETURNING *`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error('Could not add order: ' + String(error));
        }
    }

    async addProduct(quantity: number, orderId: string, productId: string): Promise<Order> {
        try {
            const conn = await db.connect();
            const ordersql = 'SELECT * FROM orders WHERE id=($1)';
            const ordersqlResult = await conn.query(ordersql, [orderId]);
            let order = ordersqlResult.rows[0];
            if (String(order.status) !== 'open') {
                throw new Error(
                    'Could not add product ' +
                        String(productId) +
                        ' to order ' +
                        String(orderId) +
                        ' because order status is ' +
                        String(order.status)
                );
            } else {
                const sql =
                    'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
                const result = await conn.query(sql, [quantity, orderId, productId]);
                order = result.rows[0];
            }
            conn.release();
            return order;
        } catch (error) {
            throw new Error(
                'Could not add product ' + String(productId) + ' to order ' + String(orderId) + ' : ' + String(error)
            );
        }
    }

    async edit(id: string, status: string): Promise<object> {
        const conn = await db.connect();
        const sql = 'UPDATE orders SET status=($2) WHERE id=($1) RETURNING id, status';
        const result = await conn.query(sql, [id, status]);
        conn.release();
        return { message: 'Order ' + String(id) + ' succefully updated!', data: result.rows[0] };
    }
}
