import { pool } from '../database/database.js'

export const getAllProducts = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM products')
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

export const getProductById = async (req, res) => {
  const { id } = req.params

  try {
    const { rows } = await pool.query('SELECT * FROM products WHERE id=$1', [id])
    if (!rows.length) return res.status(404).json({ error: 'Product not found' })
    res.json(rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}
