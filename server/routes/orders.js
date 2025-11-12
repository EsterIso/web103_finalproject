import { Router } from 'express'
import { createOrder, getOrders, getOrderById } from '../controllers/ordersController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = Router()

// All order routes require login
router.use(authMiddleware)

// POST /api/orders
router.post('/', createOrder)

// GET /api/orders
router.get('/', getOrders)

// GET /api/orders/:id
router.get('/:id', getOrderById)

export default router
