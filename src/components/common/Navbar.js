import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/images/logo.png'; // Import the logo

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }

    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItemCount(cart.reduce((total, item) => total + item.quantity, 0));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    // Redirect to home page
    window.location.href = '/';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          <img src={logo} alt="Helmet Shop Logo" className="navbar-logo-image" />
          <span className="navbar-logo-text">Bi Helmet</span>
        </NavLink>

        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className="navbar-toggle-icon"></span>
        </div>
        
        {/* Main Navigation Links */}
        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <NavLink to="/" className="navbar-link" activeClassName="active" exact>Home</NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/products" className="navbar-link" activeClassName="active">Products</NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/search" className="navbar-link" activeClassName="active">Search</NavLink>
          </li>
          {/* Add Cart link to main menu */}
          <li className="navbar-item">
            <NavLink to="/cart" className="navbar-link" activeClassName="active">
              Cart
              {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
            </NavLink>
          </li>
          {/* Action items will be moved to navbar-actions for desktop view */}
          {/* Mobile view specific items */}
          {/* Remove Cart Icon from mobile-specific link, if needed, or remove the block */}
          {/* Let's remove the mobile-specific cart link entirely as it's now in the main menu */}
          {/* 
          <li className="navbar-item navbar-item-mobile">
            <Link to="/cart" className="navbar-link navbar-cart">
               Cart 
              {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
            </Link>
          </li>
          */}
          {isLoggedIn ? (
            <>
              <li className="navbar-item navbar-item-mobile">
                <NavLink to="/profile" className="navbar-link">My Profile</NavLink>
              </li>
              <li className="navbar-item navbar-item-mobile">
                <button onClick={handleLogout} className="navbar-button navbar-button-mobile">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item navbar-item-mobile">
                <NavLink to="/login" className="navbar-link">Login</NavLink>
              </li>
              <li className="navbar-item navbar-item-mobile">
                <NavLink to="/register" className="navbar-button navbar-button-signup navbar-button-mobile">Sign Up</NavLink>
              </li>
            </>
          )}
        </ul>

        {/* Action Buttons (Desktop) */}
        <div className="navbar-actions">
          {/* Remove Cart icon link from desktop actions */}
          {/* 
          <Link to="/cart" className="navbar-link navbar-cart-icon">
            <i className="fas fa-shopping-cart"></i>
            {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </Link>
           */}
          {isLoggedIn ? (
            <>
              <NavLink to="/profile" className="navbar-link">My Profile</NavLink>
              <button onClick={handleLogout} className="navbar-button navbar-button-logout">Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="navbar-button navbar-button-login">Log In</NavLink>
              <NavLink to="/register" className="navbar-button navbar-button-signup">Sign Up</NavLink>
            </>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar; 