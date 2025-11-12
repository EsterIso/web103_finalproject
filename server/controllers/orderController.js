import { pool } from '../database/database.js'

// Create order from cart
export const createOrder = async (req, res) => {
  const userId = req.user.id
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    const cartItems = (await client.query(
      `SELECT ci.product_id, ci.quantity, p.price
       FROM cart_items ci
       JOIN carts c ON ci.cart_id = c.id
       JOIN products p ON ci.product_id = p.id
       WHERE c.user_id=$1`,
      [userId]
    )).rows

    if (!cartItems.length) return res.status(400).json({ error: 'Cart is empty' })

    const order = (await client.query(
      'INSERT INTO orders (user_id, total_price) VALUES ($1, 0) RETURNING *',
      [userId]
    )).rows[0]

    let total = 0
    for (const item of cartItems) {
      const price = item.price * item.quantity
      total += price
      await client.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price_at_time) VALUES ($1, $2, $3, $4)',
        [order.id, item.product_id, item.quantity, item.price]
      )
    }

    await client.query('UPDATE orders SET total_price=$1 WHERE id=$2', [total, order.id])
    await client.query('DELETE FROM cart_items WHERE cart_id IN (SELECT id FROM carts WHERE user_id=$1)', [userId])

    await client.query('COMMIT')
    res.status(201).json({ orderId: order.id, total })
  } catch (err) {
    await client.query('ROLLBACK')
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  } finally {
    client.release()
  }
}

// Get all orders for user
export const getOrders = async (req, res) => {
  const userId = req.user.id
  try {
    const { rows } = await pool.query('SELECT * FROM orders WHERE user_id=$1', [userId])
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

// Get a single order by ID
export const getOrderById = async (req, res) => {
  const { id } = req.params
  try {
    const { rows } = await pool.query('SELECT * FROM orders WHERE id=$1', [id])
    if (!rows.length) return res.status(404).json({ error: 'Order not found' })
    res.json(rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}
