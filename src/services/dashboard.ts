import db from './../Config/database';

export class DashboardQueries {
    async completedOrders(): Promise<Array<{ name: string; price: number; order_id: string }>> {
        try {
            const conn = await db.connect();
            const sql =
                "SELECT op.id, op.quantity, op.order_id, op.product_id FROM order_products AS op INNER JOIN products AS p ON op.product_id=p.id INNER JOIN orders AS o ON op.order_id=o.id WHERE o.status='closed'";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error('unable get products and orders: ' + String(err));
        }
    }

    async allOrdersByUser(userId: string): Promise<object[]> {
        try {
            const conn = await db.connect();
            const sql =
                'SELECT op.quantity, o.id, o.status, p.id AS product_id, p.name, p.price, u.id AS user_id, u.firstname, u.lastname, u.email FROM order_products AS op INNER JOIN orders AS o ON o.id = op.order_id INNER JOIN products AS p ON p.id = op.product_id INNER JOIN users AS u ON u.id = o.user_id WHERE u.id=$1';
            const result = await conn.query(sql, [userId]);
            const rows = result.rows;
            const data: object[] = [];
            for (let i = 0; i < rows.length; i++) {
                data.push({
                    order: {
                        id: rows[i].id,
                        status: rows[i].status,
                        product: {
                            id: rows[i].product_id,
                            name: rows[i].name,
                            price: rows[i].price,
                        },
                        user: {
                            id: rows[i].user_id,
                            firstname: rows[i].firstname,
                            lastname: rows[i].lastname,
                            email: rows[i].email,
                        },
                    },
                });
            }
            conn.release();
            return data;
        } catch (err) {
            throw new Error('unable get users with orders: ' + String(err));
        }
    }

    async fiveMostPopular(): Promise<Array<{ name: string; price: number }>> {
        try {
            const conn = await db.connect();
            const sql =
                'SELECT p.id, p.name, p.price, op.quantity FROM order_products AS op LEFT JOIN products AS p ON p.id=op.product_id GROUP BY p.id, p.name, p.price, op.quantity ORDER BY COALESCE(SUM(op.quantity), 0) DESC LIMIT 5';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error('unable get products by price: ' + String(err));
        }
    }
}
