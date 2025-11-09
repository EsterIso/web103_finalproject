import './header.css'
import { ShoppingCart, UserRound } from "lucide-react";

function Header() {

    return (
        <div className='header-container'>
            <div className='title'>
                <img src="codepath.jpg" alt="CodePath" />
            </div>
            <div className='header-buttons'>
                <button><ShoppingCart /></button>
                <button><UserRound /></button>
            </div>
        </div>
    )
}

export default Header;