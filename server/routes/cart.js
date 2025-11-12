import { Router } from 'express'
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem
} from '../controllers/cartController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = Router()

// All cart routes require login
router.use(authMiddleware)

// GET /api/cart
router.get('/', getCart)

// POST /api/cart
router.post('/', addToCart)

// PUT /api/cart/:itemId
router.put('/:itemId', updateCartItem)

// DELETE /api/cart/:itemId
router.delete('/:itemId', removeCartItem)

export default router
