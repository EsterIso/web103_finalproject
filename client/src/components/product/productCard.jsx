import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import cartAPI from "../../services/cartAPI";


function ProductCard({ product }) {
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    const goToProduct = () => navigate(`/product/${product.id}`);
    const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            goToProduct()
        }
    }
    const handleAddToCart = async (e) => {
        e.stopPropagation();
        const token = localStorage.getItem('token');
        if (!token) {
            setMessage("Please log in to add items to cart");
            return;
        }

        setLoading(true);
        try {
            const productData = {
                product_id: product.id,
                quantity: quantity
            }
            await cartAPI.addToCart(productData);
            setMessage("Added to cart!");
            setTimeout(() => setMessage(""), 2000);
        } catch (error) {
            setMessage("Failed to add to cart");
            console.error(error);
        }
        setLoading(false);
    };

    if (!product) {
        return <div className="product-card">Loading...</div>;
    }

    return (
        <article className="product-card" onClick={goToProduct} onKeyDown={handleKeyDown} style={{ cursor: 'pointer' }}>
            <div className="card-top">
                <div>
                    <h3>{product.name}</h3>
                    <p id="category">{product.description}</p>
                </div>
                <div className="price-section">
                    <p>${product.price}</p>
                    <button onClick={handleAddToCart} disabled={loading}title="Add to cart">
                        <ShoppingBag />
                    </button>
                </div>
            </div>
            <div className="card-bottom">
                <img 
                    src={product.image_url} 
                    alt={product.name}
                    onError={(e) => {
                        e.target.src = "https://via.placeholder.com/300?text=Product+Image";
                    }}
                />
            </div>
            {message && <p className="cart-message">{message}</p>}
        </article>
    );
}

export default ProductCard;