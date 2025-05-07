const mysql = require('mysql2/promise');
require('dotenv').config();

// Crear pool de conexiones a MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || '26.106.45.23',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'practicasfl',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
