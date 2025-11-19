import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import paymentAPI from '../services/paymentAPI'
import '../styles/order.css'

export default function OrderSuccess() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState('processing')
  const [orderData, setOrderData] = useState(null)

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    
    if (!sessionId) {
      setStatus('error')
      return
    }

    const confirmOrder = async () => {
      try {
        const data = await paymentAPI.confirmCheckout(sessionId)
        setOrderData(data)
        setStatus('success')
      } catch (err) {
        console.error('Failed to confirm order:', err)
        setStatus('error')
      }
    }

    confirmOrder()
  }, [searchParams])

  return (
    <div className="order-success-container">
      {status === 'processing' && (
        <div>
          <h2>Processing your order...</h2>
          <p>Please wait while we confirm your payment.</p>
        </div>
      )}
      
      {status === 'success' && (
        <div>
          <h2>✓ Order Confirmed!</h2>
          <p>Thank you for your purchase!</p>
          <p>Order ID: {orderData?.orderId}</p>
          <p>Total: ${orderData?.total?.toFixed(2)}</p>
          <button onClick={() => navigate('/')}>Continue Shopping</button>
        </div>
      )}
      
      {status === 'error' && (
        <div>
          <h2>Something went wrong</h2>
          <p>We couldn't process your order. Please contact support.</p>
          <button onClick={() => navigate('/cart')}>Back to Cart</button>
        </div>
      )}
    </div>
  )
}