import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bb-navbar">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <span className="bb-logo-dot me-2" />
          <span className="bb-logo-text">blackboard</span>
        </Link>

        <button
          className="navbar-toggler bb-navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
          <ul className="navbar-nav align-items-lg-center gap-lg-3 mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link bb-nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link bb-nav-link" to="/signup">
                Sign Up
              </NavLink>
            </li>
            <li className="nav-item ms-lg-2">
              <NavLink className="btn bb-signin-btn btn-sm rounded-pill" to="/login">
                Sign In
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

