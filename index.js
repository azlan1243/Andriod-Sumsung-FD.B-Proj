const express = require('express');
const Database = require('better-sqlite3');
require('dotenv').config();

const app = express();
app.use(express.json());

// SQLite Connection
const db = new Database('mobileshop.db');

// Create tables if they don't exist
db.exec(`
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

// Routes
app.get('/products', (req, res) => {
  try {
    const products = db.prepare('SELECT * FROM products').all();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/products', (req, res) => {
  try {
    const { name, brand, price, description, category, stock } = req.body;
    const stmt = db.prepare(
      'INSERT INTO products (name, brand, price, description, category, stock) VALUES (?, ?, ?, ?, ?, ?)'
    );
    const result = stmt.run(name, brand, price, description, category, stock);
    res.status(201).json({ id: result.lastInsertRowid, ...req.body });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});