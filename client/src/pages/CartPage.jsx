import { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import cartAPI from '../services/cartAPI'
import paymentAPI from '../services/paymentAPI'
import '../styles/cart.css'

export default function CartPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  const fetchCart = async () => {
    setLoading(true)
    try {
      const data = await cartAPI.getCart()
      setItems(data || [])
    } catch (err) {
      console.error('Failed to load cart:', err)
      setMessage('Failed to load cart')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  const handleRemove = async (itemId) => {
    try {
      await cartAPI.removeCartItem(itemId)
      setItems(prev => prev.filter(i => i.item_id !== itemId))
    } catch (err) {
      console.error('Remove failed:', err)
      setMessage('Failed to remove item')
      setTimeout(() => setMessage(''), 2000)
    }
  }

  const handleChangeQty = async (itemId, newQty) => {
    if (newQty < 1) return
    try {
      const updated = await cartAPI.updateCartItem(itemId, newQty)
      setItems(prev => prev.map(i => i.item_id === itemId ? { ...i, quantity: updated.quantity } : i))
    } catch (err) {
      console.error('Update quantity failed:', err)
      setMessage('Failed to update quantity')
      setTimeout(() => setMessage(''), 2000)
    }
  }

  const handleCheckout = async () => {
    setCheckoutLoading(true)
    setMessage('')
    
    try {
      // Create Stripe checkout session
      const { url } = await paymentAPI.createCheckoutSession(items)
      
      // Redirect to Stripe Checkout URL
      window.location.href = url
    } catch (err) {
      console.error('Checkout failed:', err)
      setMessage(err.message || 'Failed to start checkout')
      setCheckoutLoading(false)
    }
  }

  const total = items.reduce((sum, it) => sum + (Number(it.price) * Number(it.quantity)), 0)

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {loading ? (
        <p>Loading cart...</p>
      ) : items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {items.map(item => (
            <div className="cart-item" key={item.item_id}>
              <div className="item-info">
                <h4>{item.name}</h4>
                <p>${Number(item.price).toFixed(2)}</p>
              </div>
              <div className="qty-controls">
                <button onClick={() => handleChangeQty(item.item_id, Number(item.quantity) - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleChangeQty(item.item_id, Number(item.quantity) + 1)}>+</button>
              </div>
              <div className="item-actions">
                <button className="remove-btn" onClick={() => handleRemove(item.item_id)} title="Remove">
                  <Trash2 />
                </button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total: ${total.toFixed(2)}</h3>
            <button 
              className="checkout-btn" 
              onClick={handleCheckout}
              disabled={checkoutLoading || items.length === 0}
            >
              {checkoutLoading ? 'Redirecting to checkout...' : 'Checkout'}
            </button>
          </div>
        </div>
      )}
      {message && <p className="cart-message">{message}</p>}
    </div>
  )
}