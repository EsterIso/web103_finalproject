import './header.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, UserRound, LogOut } from "lucide-react";

function Header({ user, setUser }) {

    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleUserClick = () => {
        if (user) {
            setShowDropdown(!showDropdown);
        } else {
            navigate('/login');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setShowDropdown(false);
        navigate('/');
    };

    return (
        <div className='header-container'>
            <div className='title'>
                <img src="/codepath.jpg" alt="CodePath" onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
            </div>
            <div className='header-buttons'>
                <button onClick={() => navigate('/cart')}><ShoppingCart /></button>
                <div className='user-button-wrapper'>
                    <button onClick={handleUserClick}><UserRound /></button>
                    {user && showDropdown && (
                        <div className='dropdown-menu'>
                            <button className='dropdown-item logout-btn' onClick={handleLogout}>
                                <LogOut size={18} />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header;