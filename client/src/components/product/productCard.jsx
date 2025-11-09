import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";

function ProductCard() {

    const [product, setProduct] = useState();
    
    useEffect(() => {
 
    })

    return (
        <article className="product-card">
            <div className="card-top">
                <h3>{product.name}</h3>

                <div className="price-section">
                    <p>${product.category}</p>
                    <p>${product.price}</p>
                    <button><ShoppingBag /></button>
                </div>
            </div>
            <div className="card-bottom">
                <img src={product.image} alt={product.name}/>
            </div>
        </article>
    )
}

export default ProductCard;