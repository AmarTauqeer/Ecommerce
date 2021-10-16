import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";

import "./ClientNavbar.css";

const ClientNavbar = ({ user, products }) => {
  const history = useHistory();
  // signout
  const handleSignOut = () => {
    localStorage.setItem("userInfo", "");
    history.push("/");
    window.location.reload(false);
  };
  return (
    <div className="client-navbar">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <Link class="navbar-brand" to="/">
            <h2>Grocery Store</h2>
          </Link>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link " to="/">
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link " to="/product-gallery">
                  Shop
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link " to="/contact">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link class="nav-link " to="/cart">
                <FiShoppingCart size={26} color="gray" />
                {products.length > 0 && (
                  <span className="position-absolute translate-middle badge rounded-pill bg-danger">
                    {products.length}
                  </span>
                )}
              </Link>
            </li>
            {user !== "" ? (
              <>
                <li class="nav-item">
                  <Link class="nav-link" to="/order">
                    Orders
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
                <li class="nav-item">
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="btn btn-primary btn-md"
                    style={{ backgroundColor: "#392613", color: "white" }}
                  >
                    Signout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li class="nav-item">
                  <Link class="nav-link" to="/signin">
                    Signin
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/signup">
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default ClientNavbar;
