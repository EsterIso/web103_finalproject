const API_BASE_URL = import.meta.env.VITE_API_URL;

async function getCart() {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/cart/`, {
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
    });
    const data = await response.json();
    return data;
}

async function addToCart(productData) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/cart/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(productData)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Request failed');
    }
    console.log(data);
    return data;
}

async function updateCartItem(itemId, quantity) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/cart/${itemId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ quantity })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Request failed');
    }
    return data;
}

async function removeCartItem(itemId) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/cart/${itemId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
    });

    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Request failed');
    }
    return true;
}

export default {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem
}
