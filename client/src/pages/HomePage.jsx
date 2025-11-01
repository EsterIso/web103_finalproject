import { SlidersHorizontal, Grid2x2, Grid3x3 }  from "lucide-react"

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
            </div>
        </div>
    )
}

export default HomePage;