import './header.css'
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, UserRound } from "lucide-react";

function Header() {

    const navigate = useNavigate();

    const handleUserClick = () => {
        navigate('/login');
    };

    return (
        <div className='header-container'>
            <div className='title'>
                <img src="codepath.jpg" alt="CodePath" />
            </div>
            <div className='header-buttons'>
                <button><ShoppingCart /></button>
                <button onClick={handleUserClick}><UserRound /></button>
            </div>
        </div>
    )
}

export default Header;