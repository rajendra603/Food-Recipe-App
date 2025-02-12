import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Modals from "../Modals";
import Cart from "../Screens/Cart";
import { useCart } from "./ContestReducer";

export default function Navbar() {
  let data = useCart();
  const navigate = useNavigate();
  const [cartView, setcartView] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark "
        style={{
          backgroundColor: "#8B4513",
        }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            Tasty Bites
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav  mx-auto">
              <li className="nav-item ">
                <Link
                  className=" nav-link active fs-5 custom-hover "
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="nav-link active fs-5 custom-hover"
                  aria-current="page"
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  className="nav-link active fs-5 custom-hover"
                  aria-current="page"
                  to="/contact"
                >
                  Contact Us
                </Link>
              </li>

              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5 custom-hover"
                    aria-current="page"
                    to="/myorders"
                  ></Link>
                </li>
              ) : (
                ""
              )}
            </ul>

            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link
                  className="custom-btn btn  mx-1"
                  style={{
                    color: "#8B4513",
                    backgroundColor: "white",
                  }}
                  to="/login"
                >
                  Login
                </Link>

                <Link
                  className=" custom-btn btn  mx-1"
                  style={{
                    color: "#8B4513",
                    backgroundColor: "white",
                  }}
                  to="/createuser"
                >
                  SignUp
                </Link>
              </div>
            ) : (
              <div>
                <div
                  className="btn bg-white text-success m-3 custom-hover"
                  onClick={() => {
                    setcartView(true);
                  }}
                >
                  My Cart {""}
                  <Badge pill bg="danger">
                    {data.length}
                  </Badge>
                </div>
                {cartView ? (
                  <Modals onClose={() => setcartView(false)}>
                    <Cart />
                  </Modals>
                ) : (
                  ""
                )}
                <div
                  className="btn bg-white text-danger custom-hover "
                  onClick={handleLogOut}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
