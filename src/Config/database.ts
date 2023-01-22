import { config } from 'dotenv-safe';
import { Pool } from 'pg';

config();
const { ENV, POSTGRES_HOST, POSTGRES_DB, POSTGRES_TEST_DB, POSTGRES_USER, POSTGRES_PASSWORD } = process.env;

let db: Pool;

if (ENV === 'test') {
    db = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
} else {
    db = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}

export default db;
