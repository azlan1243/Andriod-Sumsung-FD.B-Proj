const express = require('express');
const { Database } = require('@vlcn.io/crsqlite');
const { open } = require('@vlcn.io/wa-sqlite');
require('dotenv').config();

const app = express();
app.use(express.json());

async function initializeDatabase() {
  // Open SQLite database
  const db = await open({
    filename: 'mobileshop.db',
    driver: Database
  });

  // Create tables if they don't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      brand TEXT,
      price REAL,
      description TEXT,
      category TEXT,
      stock INTEGER
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customerName TEXT,
      totalAmount REAL,
      orderDate DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS order_products (
      orderId INTEGER,
      productId INTEGER,
      quantity INTEGER,
      FOREIGN KEY (orderId) REFERENCES orders(id),
      FOREIGN KEY (productId) REFERENCES products(id)
    );
  `);

  return db;
}

let db;

// Initialize database and start server
(async () => {
  try {
    db = await initializeDatabase();

    // Routes
    app.get('/products', async (req, res) => {
      try {
        const products = await db.all('SELECT * FROM products');
        res.json(products);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    app.post('/products', async (req, res) => {
      try {
        const { name, brand, price, description, category, stock } = req.body;
        const result = await db.run(
          'INSERT INTO products (name, brand, price, description, category, stock) VALUES (?, ?, ?, ?, ?, ?)',
          [name, brand, price, description, category, stock]
        );
        res.status(201).json({ id: result.lastID, ...req.body });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  }
})();