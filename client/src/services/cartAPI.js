const API_BASE_URL = import.meta.env.VITE_API_URL;

async function getCart() {
    const response = await fetch(`${API_BASE_URL}/cart/`);
    const data = await response.json();
    return data;
}

async function addToCart(productData) {
    const response = await fetch(`${API_BASE_URL}/cart/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(productData)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Login failed');
    }
    console.log(data);
    return data
}

export default {
    getCart,
    addToCart
}