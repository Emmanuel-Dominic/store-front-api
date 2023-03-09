import db from './../Config/database';

export interface Product {
    id?: string;
    name: string;
    price: string;
}

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const conn = await db.connect();
            const sql = 'SELECT * FROM products';
            const result = await db.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error('Unable to get products: ' + String(error));
        }
    }

    async show(id: string): Promise<Product> {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const conn = await db.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error('Could not find product ' + String(id) + ' Error: ' + String(error));
        }
    }

    async create(p: Product): Promise<Product> {
        try {
            const conn = await db.connect();
            const sql = `INSERT INTO "products" ("name", "price") VALUES('${p.name}', '${p.price}') RETURNING id, name, price`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error('Could not add product ' + String(p.name) + ' Error: ' + String(error));
        }
    }

    async delete(id: string): Promise<string> {
        try {
            const conn = await db.connect();
            const sql = 'DELETE FROM products WHERE id=($1)';
            await conn.query(sql, [id]);
            conn.release();
            return 'Product ' + String(id) + ' succefully deleted!';
        } catch (error) {
            throw new Error('Unable to delete product ' + String(id) + ': ' + String(error));
        }
    }

    async edit(id: string, name: string, price: string): Promise<object> {
        try {
            const conn = await db.connect();
            const sql = 'UPDATE products SET name=($2), price=($3) WHERE id=($1) RETURNING id, name, price';
            const result = await conn.query(sql, [id, name, price]);
            conn.release();
            return { message: 'Product ' + String(id) + ' succefully updated!', data: result.rows[0] };
        } catch (error) {
            throw new Error('Unable to edit product ' + String(id) + ': ' + String(error));
        }
    }
}
