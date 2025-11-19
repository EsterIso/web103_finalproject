import { pool } from './database.js'
import './dotenv.js'
import { productData } from '../data/products.js' 

// 5 relational tables: users, products, carts, orders, order_items
const createTables = async () => {
  const createTablesQuery = `
    -- Drop existing tables (in order to avoid FK issues)
    DROP TABLE IF EXISTS order_items;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS cart_items;
    DROP TABLE IF EXISTS carts;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS users;

    -- Users table
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Products table
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      price NUMERIC(10,2) NOT NULL,
      image_url VARCHAR(255),
      stock_count INT DEFAULT 0
    );

    -- Carts table (one per user)
    CREATE TABLE IF NOT EXISTS carts (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Cart items table
    CREATE TABLE IF NOT EXISTS cart_items (
      id SERIAL PRIMARY KEY,
      cart_id INT REFERENCES carts(id) ON DELETE CASCADE,
      product_id INT REFERENCES products(id) ON DELETE CASCADE,
      quantity INT NOT NULL DEFAULT 1
    );

    -- Orders table
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      total_price NUMERIC(10,2) NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Order items table
    CREATE TABLE IF NOT EXISTS order_items (
      id SERIAL PRIMARY KEY,
      order_id INT REFERENCES orders(id) ON DELETE CASCADE,
      product_id INT REFERENCES products(id),
      quantity INT NOT NULL,
      price_at_time NUMERIC(10,2) NOT NULL
    );
  `

  try {
    await pool.query(createTablesQuery)
    console.log('All tables created successfully')
  } catch (err) {
    console.error('Error creating tables', err)
  }
}

const seedProductsTable = async () => {
  await createTables();
  
  productData.forEach((product) => {
    const insertQuery = {
      text: `INSERT INTO products (name, description, price, image_url, stock_count) 
             VALUES ($1, $2, $3, $4, $5)`
    }
    const values = [
      product.name,
      product.description,
      product.price,
      product.image_url,
      product.stock_count
    ]
    
    pool.query(insertQuery, values, (err) => {
      if(err) {
        console.error('Error inserting product', err);
        return;
      }
      console.log(`${product.name} added successfully`);
    })
  });
}

// Run the seeding
seedProductsTable()