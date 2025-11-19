import { pool } from '../database/database.js'

// Get user's cart
export const getCart = async (req, res) => {
  const userId = req.user.id
  try {
    const { rows } = await pool.query(
      `SELECT ci.id AS item_id, p.id AS product_id, p.name, p.price, ci.quantity
       FROM cart_items ci
       JOIN carts c ON ci.cart_id = c.id
       JOIN products p ON ci.product_id = p.id
       WHERE c.user_id=$1`,
      [userId]
    )
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

// Add item to cart
export const addToCart = async (req, res) => {
  const userId = req.user.id
  const { product_id, quantity } = req.body

  try {
    // Find or create user's cart
    let { rows } = await pool.query('SELECT id FROM carts WHERE user_id=$1', [userId])
    let cartId
    if (rows.length) {
      cartId = rows[0].id
    } else {
      cartId = (await pool.query('INSERT INTO carts (user_id) VALUES ($1) RETURNING id', [userId])).rows[0].id
    }

    // Check if product already exists in cart
    const existingItem = await pool.query(
      'SELECT id, quantity FROM cart_items WHERE cart_id=$1 AND product_id=$2',
      [cartId, product_id]
    )

    let result
    if (existingItem.rows.length > 0) {
      // Update existing item quantity
      const newQuantity = existingItem.rows[0].quantity + quantity
      result = await pool.query(
        'UPDATE cart_items SET quantity=$1 WHERE id=$2 RETURNING *',
        [newQuantity, existingItem.rows[0].id]
      )
      res.json({ ...result.rows[0], updated: true })
    } else {
      // Insert new item
      result = await pool.query(
        'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
        [cartId, product_id, quantity]
      )
      res.status(201).json({ ...result.rows[0], updated: false })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

// Update cart item
export const updateCartItem = async (req, res) => {
  const { itemId } = req.params
  const { quantity } = req.body

  try {
    const { rows } = await pool.query(
      'UPDATE cart_items SET quantity=$1 WHERE id=$2 RETURNING *',
      [quantity, itemId]
    )
    res.json(rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

// Remove cart item
export const removeCartItem = async (req, res) => {
  const { itemId } = req.params

  try {
    await pool.query('DELETE FROM cart_items WHERE id=$1', [itemId])
    res.status(204).send()
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}