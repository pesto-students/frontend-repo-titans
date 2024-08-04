import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import { GiLibertyWing } from 'react-icons/gi';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky border-b-2 header border-b-red-700">
      <nav className="navbar">
        <span id='logo'>

          <Link to="/" className="flex items-center logo">
            <span className="text-red-700 raleway">Workout</span>
            <GiLibertyWing className="inline pl-1 text-slate-50" size={20} />
          </Link>
        </span>

        <span id='hamburger'>
          <div className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <FaTimes size={30} className="text-red-700" /> : <FaBars size={30} className="text-red-700" />}
          </div>
        </span>



        {/* Desktop Menu */}
        <ul className="space-x-4 md:flex nav-menu">

          <li className="nav-item">
            <NavLink  to="/home" onClick={closeMenu}>Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/search"  onClick={closeMenu}>Search</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/bookings"  onClick={closeMenu}>Bookings</NavLink>
          </li>


          <li className="nav-item">
            <Link to="/login" className="px-4 py-2 font-semibold text-red-700 bg-transparent border border-red-500 hover:bg-red-500 hover:text-white hover:border-transparent" onClick={closeMenu}>Login</Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="px-4 py-2 font-semibold bg-red-700 border border-red-300 shadow hover:bg-red-800 text-slate-100" onClick={closeMenu}>Register</Link>
          </li>
        </ul>





        {/* Mobile Menu */}
        <ul className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-800  ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'} nav-menu`}>
          <li className="nav-item">
            <NavLink to="/home"  onClick={closeMenu}>Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/search"  onClick={closeMenu}>Search</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/bookings"  onClick={closeMenu}>Bookings</NavLink>
          </li>
          <li className="nav-item">
            <Link to="/login" className="px-4 py-2 font-semibold text-red-700 bg-transparent border border-red-500 rounded hover:bg-red-500 hover:text-white hover:border-transparent" onClick={closeMenu}>Login</Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="px-4 py-2 font-semibold bg-red-700 border rounded shadow hover:bg-red-800 text-slate-100 border-slate-300" onClick={closeMenu}>Register</Link>
          </li>
          <button className="absolute text-white top-4 right-4" onClick={closeMenu}>
            <FaTimes size={30} />
          </button>
        </ul>


      </nav>
    </header>


  );
};

export default Navbar;