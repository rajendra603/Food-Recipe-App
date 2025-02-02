import React from "react";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <div>
      <footer className="d-flex flex-column justify-content-center align-items-center py-3 my-4 border-top">
        <div>
          <span className="text-body-secondary"> Tasty Bites</span>
        </div>
        <ul className="nav justify-content-center list-unstyled d-flex mt-3">
          <li className="ms-3">
            <Link
              to="/about"
              className="text-body-secondary text-decoration-none"
            >
              About Us
            </Link>
          </li>
          <li className="ms-3">
            <Link
              to="/contact"
              className="text-body-secondary text-decoration-none"
            >
              Contact
            </Link>
          </li>
          <li className="ms-3">
            <span className="text-body-secondary text-decoration-none">
              Privacy Policy
            </span>
          </li>
        </ul>
      </footer>
    </div>
  );
}
