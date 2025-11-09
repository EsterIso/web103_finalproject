import { SlidersHorizontal, Grid2x2, Grid3x3 }  from "lucide-react"
import { ShoppingBag } from "lucide-react";
import "../components/product/productCard.css"

function HomePage() {

    return (
        <div className="main">
            <div className="showcase">
                <video src="CodePathVid.mp4" autoPlay muted playsInline loop></video>
            </div>
            <div className="products-section">
                <div className="filters">
                    <div className="grid-type">
                        <Grid2x2 />
                        <Grid3x3 />
                    </div>
                    <input type="search" id="product-search" name="q" placeholder="Search Merch"></input>

                    <SlidersHorizontal />
                </div>

                <div className="product-grid">
                    <article className="product-card">
                        <div className="card-top">
                            <div>
                                <h3>Wireless Bluetooth Headphones</h3>
                                <p id="category">Hoodie</p>
                            </div>
                            <div className="price-section">
                                
                                <p>$79.99</p>
                                <button><ShoppingBag /></button>
                            </div>
                        </div>
                        <div className="card-bottom">
                            <img src="https://media.licdn.com/dms/image/v2/C4E22AQF6w-5A5aECGw/feedshare-shrink_800/feedshare-shrink_800/0/1664693791755?e=2147483647&v=beta&t=xqkCq3fHPzF5wBUVbH8yxg2saXDdB3qbXXiiACQp430" alt="Wireless Bluetooth Headphones"/>
                        </div>
                    </article>


                </div>
            </div>
        </div>
    )
}

export default HomePage;