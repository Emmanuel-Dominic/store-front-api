import { hashSync, compareSync } from 'bcrypt';
import db from './../Config/database';

const saltRounds = process.env.SALT_ROUNDS ?? '10';

export interface User {
    id?: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export class UserStore {
    async index(): Promise<object[]> {
        try {
            const conn = await db.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            const rows = result.rows;
            conn.release();
            const data = [];
            for (let i = 0; i < rows.length; i++) {
                data.push({
                    id: rows[i].id,
                    firstname: rows[i].firstname,
                    lastname: rows[i].lastname,
                    email: rows[i].email,
                });
            }
            return data;
        } catch (error) {
            throw new Error('Could not get users. Error: ' + String(error));
        }
    }

    async show(id: string): Promise<User> {
        try {
            const sql = 'SELECT id, firstname, lastname, email FROM users WHERE id=($1)';
            const conn = await db.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error('Could not find user ' + String(id) + ' Error: ' + String(error));
        }
    }

    async create(p: User): Promise<User> {
        const hashedPassword = hashSync(p.password, parseInt(saltRounds));
        try {
            const conn = await db.connect();
            const sql =
                'INSERT INTO users (firstname, lastname, email, password) VALUES($1, $2, $3, $4) RETURNING id, firstname, lastname, email';
            const result = await conn.query(sql, [p.firstname, p.lastname, p.email, hashedPassword]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error('Could not add user ' + String(p.email) + ' Error: ' + String(error));
        }
    }

    async authenticate(email: string, password: string): Promise<object | null> {
        try {
            const conn = await db.connect();
            const sql = 'SELECT * FROM users WHERE email=($1)';
            const result = await conn.query(sql, [email]);
            conn.release();
            if (result.rows.length > 0) {
                const user = result.rows[0];
                if (compareSync(password, user.password)) {
                    return {
                        id: user.id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email,
                    };
                }
            }
            return null;
        } catch (error) {
            throw new Error('Could not authenticate user ' + String(email) + ' Error: ' + String(error));
        }
    }

    async delete(id: string): Promise<string> {
        try {
            const conn = await db.connect();
            const sql = 'DELETE FROM users WHERE id=($1)';
            await conn.query(sql, [id]);
            conn.release();
            return 'User ' + String(id) + ' is successfully deleted!';
        } catch (error) {
            throw new Error('Could not delete user ' + String(id) + ' Error: ' + String(error));
        }
    }

    async edit(id: string, firstname: string, lastname: string, password: string): Promise<object> {
        try {
            const hashedPassword = hashSync(password, parseInt(saltRounds));
            const conn = await db.connect();
            const sql =
                'UPDATE users SET firstname=($2), lastname=($3), password=($4) WHERE id=($1) RETURNING id, firstname, lastname, email';
            const result = await conn.query(sql, [id, firstname, lastname, hashedPassword]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error('Could not edit user ' + String(id) + ' Error: ' + String(error));
        }
    }
}
