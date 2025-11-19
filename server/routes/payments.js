import { Router } from 'express'
import { createCheckoutSession, confirmCheckout } from '../controllers/paymentController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = Router()

// All payment routes require login
router.use(authMiddleware)

// POST /api/payments/checkout-session
router.post('/checkout-session', createCheckoutSession)

// POST /api/payments/confirm-checkout
router.post('/confirm-checkout', confirmCheckout)

export default router
