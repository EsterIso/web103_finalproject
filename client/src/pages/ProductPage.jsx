import { ShoppingBag } from "lucide-react";

function ProductPage() {

    return (
        <div className="product-container">
            <div className="card-info">
                <div>
                    <h3>Wireless Bluetooth Headphones</h3>
                    <p id="category">Hoodie</p>
                </div>
                <div className="price-section">
                    
                    <p>$79.99</p>
                    <button><ShoppingBag /></button>
                </div>
            </div>
            <div className="card-image">
                <img src="https://media.licdn.com/dms/image/v2/C4E22AQF6w-5A5aECGw/feedshare-shrink_800/feedshare-shrink_800/0/1664693791755?e=2147483647&v=beta&t=xqkCq3fHPzF5wBUVbH8yxg2saXDdB3qbXXiiACQp430" alt="Wireless Bluetooth Headphones"/>
            </div>
            <div className="card-options">
                <div classId="sizes">
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
        </div>

    )
}

export default ProductPage;