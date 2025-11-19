import { useState } from "react";
import { ShoppingBag } from "lucide-react";


function ProductCard({ product }) {
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleAddToCart = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setMessage("Please log in to add items to cart");
            return;
        }

        setLoading(true);
        try {
            await cartAPI.addToCart(product.id, quantity);
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
        <article className="product-card">
            <div className="card-top">
                <div>
                    <h3>{product.name}</h3>
                    <p id="category">{product.description}</p>
                </div>
                <div className="price-section">
                    <p>${product.price}</p>
                    <button 
                        onClick={handleAddToCart}
                        disabled={loading}
                        title="Add to cart"
                    >
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