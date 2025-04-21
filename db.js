import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Create a connection pool (recommended for production)
const db = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    port: process.env.MYSQL_PORT || 3306,
});

export async function testConnection() {
    try {
        // Test connection
        const [rows, fields] = await db.query('SELECT 1 + 1 AS solution');
        console.log('Database connected, test query result:', rows[0].solution); // Should log "2"
    } catch (err) {
        console.error('Database connection failed:', err.message);
        throw err;
    }
}

export default db;
