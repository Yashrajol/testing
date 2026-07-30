import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306', 10),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'vedhkrit_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Global pool instance
export const pool = mysql.createPool(dbConfig);

// Helper function to execute queries
export async function query(sql, params = []) {
  const [rows] = await pool.query(sql, params);
  return rows;
}

// Automatic DB and Table initialization on startup
export async function initDatabase() {
  try {
    // 1. Create Connection to MySQL Server (without selecting specific DB)
    const rootConnection = await mysql.createConnection({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password,
    });

    await rootConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\`;`);
    await rootConnection.end();

    // 2. Execute Schema Script to create required tables
    const schemaPath = path.join(__dirname, 'schema.sql');
    if (fs.existsSync(schemaPath)) {
      const sqlStatements = fs.readFileSync(schemaPath, 'utf-8');
      const statements = sqlStatements
        .split(';')
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const connection = await pool.getConnection();
      for (const statement of statements) {
        await connection.query(statement);
      }
      connection.release();
      console.log('✅ MySQL Database & Tables initialized successfully.');
    }

    // 3. Execute Seed Script for initial data
    const seedPath = path.join(__dirname, 'seed.sql');
    if (fs.existsSync(seedPath)) {
      const seedStatements = fs.readFileSync(seedPath, 'utf-8');
      const statements = seedStatements
        .split(';')
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const connection = await pool.getConnection();
      for (const statement of statements) {
        await connection.query(statement);
      }
      connection.release();
      console.log('🌱 Database seeded successfully.');
    }
  } catch (error) {
    console.warn('⚠️ Database Initialization Warning (Ensure MySQL is running):', error.message);
  }
}

