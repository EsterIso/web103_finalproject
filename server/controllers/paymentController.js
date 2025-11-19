import Stripe from 'stripe'
import { pool } from '../database/database.js'


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Create checkout session
export const createCheckoutSession = async (req, res) => {
  const userId = req.user.id
  const { cartItems } = req.body

  try {
    // Get user email
    const { rows } = await pool.query('SELECT email FROM users WHERE id=$1', [userId])
    if (!rows.length) return res.status(404).json({ error: 'User not found' })

    const userEmail = rows[0].email

    // Format line items for Stripe
    const lineItems = cartItems.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: item.image_url ? [item.image_url] : []
        },
        unit_amount: Math.round(item.price * 100)
      },
      quantity: item.quantity
    }))

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: userEmail,
      success_url: `${process.env.CLIENT_URL}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/checkout`,
      metadata: { userId }
    })

    res.json({ sessionId: session.id })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create checkout session' })
  }
}

// Get checkout session and create order
export const confirmCheckout = async (req, res) => {
  const userId = req.user.id
  const { sessionId } = req.body

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== 'paid') {
      return res.status(400).json({ error: 'Payment not completed' })
    }

    // Create order from cart
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
      throw err
    } finally {
      client.release()
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to confirm checkout' })
  }
}
