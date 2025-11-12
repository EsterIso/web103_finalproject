import { pool } from '../database/database.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  const { name, email, password } = req.body

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const { rows } = await pool.query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    )
    res.status(201).json(rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE email=$1', [email])
    if (!rows.length) return res.status(401).json({ error: 'Invalid credentials' })

    const user = rows[0]
    const match = await bcrypt.compare(password, user.password_hash)
    if (!match) return res.status(401).json({ error: 'Invalid credentials' })

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}
