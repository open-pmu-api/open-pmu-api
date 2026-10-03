import fs from "fs";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: true,
    },
})

export default pool;
