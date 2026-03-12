import React from 'react';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bb-navbar">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <span className="bb-logo-dot me-2" />
          <span className="bb-logo-text">blackboard</span>
        </a>

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
              <a className="nav-link bb-nav-link active" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link bb-nav-link" href="#">
                Basic
              </a>
            </li>
            <li className="nav-item ms-lg-2">
              <button className="btn bb-signin-btn btn-sm rounded-pill" type="button">
                Sign In
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

