import { ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import productsAPI from '../services/productsAPI'

function ProductPage({ product }) {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [productState, setProductState] = useState(product || null)
    const [isFetching, setIsFetching] = useState(!product)
    const { id } = useParams()
    const navigate = useNavigate()

    const handleAddToCart = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setMessage("Please log in to add items to cart");
            return;
        }

            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const res = await fetch(`${import.meta.env.VITE_API_URL}/cart`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token ? { Authorization: `Bearer ${token}` } : {})
                    },
                    body: JSON.stringify({ product_id: productState?.id, quantity })
                })

                if (!res.ok) throw new Error('Failed to add to cart')

                setMessage("Added to cart!");
                setTimeout(() => setMessage(""), 2000);
            } catch (error) {
                setMessage("Failed to add to cart");
                console.error(error);
            }
            setLoading(false);
    };

    useEffect(() => {
        const fetchProduct = async () => {
            if (productState) return
            if (!id) {
                navigate('/')
                return
            }
            setIsFetching(true)
            try {
                const p = await productsAPI.getProductById(id)
                setProductState(p)
            } catch (err) {
                console.error('Failed to load product:', err)
            } finally {
                setIsFetching(false)
            }
        }

        fetchProduct()
    }, [id, productState, navigate])

    if (isFetching) return <div className="product-container">Loading product...</div>

    const currentProduct = productState || product

    return (
        <div className="product-container">
            <div className="card-info">
                <div>
                    <h3>{currentProduct.name}</h3>
                    <p id="category">{currentProduct.description}</p>
                </div>
                <div className="price-section">
                    
                    <p>${Number(currentProduct.price).toFixed(2)}</p>
                    <button onClick={handleAddToCart} disabled={loading} title="Add to cart">
                        <ShoppingBag />
                    </button>
                </div>
            </div>
            <div className="card-image">
                <img src={currentProduct.image_url} alt={currentProduct.name}/>
            </div>
            <div className="card-options">
                <div id="sizes">
                    <div>
                        <h4>Select Size</h4>
                    </div>
                    <div id="size-btns">
                        <button>S</button>
                        <button>M</button>
                        <button>L</button>
                    </div>
                </div>
            </div>
            {message && <p className="cart-message">{message}</p>}
        </div>

    )
}

export default ProductPage;