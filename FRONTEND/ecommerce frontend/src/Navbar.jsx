import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          YourLogo
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link">Products</Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link">Profile</Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" className="nav-link">Cart</Link>
          </li>
        </ul>
      </div>
    </nav>
    </div>
  )
}

export default Navbar