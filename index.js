const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/mobileshop', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  description: String,
  category: String,
  stock: Number
});

// Order Schema
const orderSchema = new mongoose.Schema({
  customerName: String,
  products: [{
    productId: String,
    quantity: Number
  }],
  totalAmount: Number,
  orderDate: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);

// Routes
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/products', async (req, res) => {
  const product = new Product(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});