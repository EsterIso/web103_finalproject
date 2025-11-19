const API_BASE_URL = import.meta.env.VITE_API_URL;

async function createCheckoutSession(cartItems) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/payments/checkout-session`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ cartItems })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
    }
    return data;
}

async function confirmCheckout(sessionId) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/payments/confirm-checkout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ sessionId })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Failed to confirm checkout');
    }
    return data;
}

export default {
    createCheckoutSession,
    confirmCheckout
}