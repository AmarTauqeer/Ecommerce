import React from "react";
import { AiOutlineHome, AiOutlineUnorderedList } from "react-icons/ai";
import { MdAccountBox } from "react-icons/md";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { MdContactMail } from "react-icons/md";
import { GrGallery } from "react-icons/gr";
import { FiShoppingCart } from "react-icons/fi";
import { BsPeople } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import logo from "../../images/amar.PNG";

const Sidebar = (props) => {
  const { products, user } = props;

  return (
    <>
      <div className="sidebar-nav">
        <div className="col-md-4">
          <div className="content">
            <nav className="navbar" style={{ backgroundColor: "#392613" }}>
              <ul className="navbar-nav">
                <div className="heading mb-4">Admin Dashboard</div>
                <hr />
                {user !== "" && (
                  <>
                    <div className="user-area mt-4">
                      {logo && <img src={logo} alt="logo" />}
                      {user.user_name && <div>Welcome {user.user_name}</div>}
                    </div>
                    <hr />
                  </>
                )}

                <li className="nav-item">
                  <div className="icon-container">
                    <div className="icon">
                      <AiOutlineHome size={26} />
                    </div>
                    <div>
                      <Link className="nav-link active" to="/dashboard">
                        Dashboard
                      </Link>
                    </div>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="icon-container">
                    <div className="icon">
                      <GrGallery size={26} />
                    </div>
                    <div>
                      <Link className="nav-link" to="/product-gallery">
                        Gallery
                      </Link>
                    </div>
                  </div>
                </li>
                {user !== "" && (
                  <>
                    <li className="nav-item">
                      <div className="icon-container">
                        <div className="icon">
                          <AiOutlineUnorderedList size={26} />
                        </div>
                        <div>
                          <Link className="nav-link" to="/category">
                            Category
                          </Link>
                        </div>
                      </div>
                    </li>
                    <li className="nav-item">
                      <div className="icon-container">
                        <div className="icon">
                          <AiOutlineUnorderedList size={26} />
                        </div>
                        <div>
                          <Link className="nav-link" to="/product">
                            Product
                          </Link>
                        </div>
                      </div>
                    </li>
                    <li className="nav-item">
                      <div className="icon-container">
                        <div className="icon">
                          <BsPeople size={26} />
                        </div>
                        <div>
                          <Link className="nav-link" to="/customer">
                            Customer
                          </Link>
                        </div>
                      </div>
                    </li>
                    <hr />
                    <li className="nav-item">
                      <div className="icon-container">
                        <div className="icon">
                          <FaSignOutAlt size={26} />
                        </div>
                        <div>
                          <Link
                            className="nav-link"
                            onClick={() => {
                              localStorage.setItem("userInfo", "");
                              window.location.reload(false);
                            }}
                            to="/"
                          >
                            Sign out
                          </Link>
                        </div>
                      </div>
                    </li>
                    <hr />
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
