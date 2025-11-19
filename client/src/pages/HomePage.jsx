import { useEffect, useState } from "react"
import { SlidersHorizontal, Grid2x2, Grid3x3 }  from "lucide-react"
import { ShoppingBag } from "lucide-react"
import ProductCard from "../components/product/productCard"
import productsAPI from "../services/productsAPI.js"
import "../components/product/productCard.css"

function HomePage() {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productsAPI.getAllProducts()
                setProducts(data)
                setFilteredProducts(data)
                setLoading(false)
            } catch (error) {
                console.error('Failed to fetch products:', error)
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    useEffect(() => {
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        setFilteredProducts(filtered)
    }, [searchQuery, products])

    const handleSearch = (e) => {
        setSearchQuery(e.target.value)
    }

    return (
        <div className="main">
            <div className="showcase">
                <video src="CodePathVid.mp4" autoPlay muted playsInline loop></video>
            </div>
            <div className="products-section">
                <div className="filters">
                    <div className="grid-type">
                        <button><Grid2x2 /></button>
                        <button><Grid3x3 /></button>
                    </div>
                    <input 
                        type="search" 
                        id="product-search" 
                        name="q" 
                        placeholder="Search Merch"
                        value={searchQuery}
                        onChange={handleSearch}
                    ></input>

                    <button><SlidersHorizontal /></button>
                </div>

                <div className="product-grid">
                    {loading ? (
                        <p>Loading products...</p>
                    ) : filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <p>No products found</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default HomePage;