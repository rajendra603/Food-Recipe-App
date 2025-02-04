import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Navbar from "./Navbar";
export default function Contact() {
  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2 className="text-center mb-4 " style={{ color: "#8B4513" }}>
          Get in Touch
        </h2>
        <div className="row justify-content-center">
          <div className="col-md-5 p-4 border rounded shadow me-md-4">
            <h4 className="text-center mb-3 " style={{ color: "#8B4513" }}>
              {" "}
              Contact
            </h4>
            <p>
              <FaMapMarkerAlt className="me-2 " style={{ color: "#8B4513" }} />{" "}
              Lorem ipsum dolor sit amet consectetur adipisicing. Country
            </p>
            <p>
              <FaPhone className="me-2 " style={{ color: "#8B4513" }} /> +91
              **********
            </p>
            <p>
              <FaEnvelope className="me-2" style={{ color: "#8B4513" }} />{" "}
              owner@example.com
            </p>
            <h5 className="mt-4" style={{ color: "#8B4513" }}>
              Delivery Timings{" "}
            </h5>
            <p>Monday - Friday: 9 AM - 11 PM</p>
            <p>Saturday - Sunday: 10 AM - 11 PM</p>
          </div>

          <div className="col-md-5 p-4 border rounded shadow">
            <h4 className="text-center mb-3 " style={{ color: "#8B4513" }}>
              Feedback
            </h4>
            <p className="text-muted text-center">
              We value your feedback! Let us know your experience.
            </p>
            <div className="mb-3">
              <label className="form-label">Rate Us</label>
              <select className="form-select">
                <option>⭐ Poor</option>
                <option>⭐⭐ Fair</option>
                <option>⭐⭐⭐ Good</option>
                <option>⭐⭐⭐⭐ Very Good</option>
                <option>⭐⭐⭐⭐⭐ Excellent</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Comments</label>
              <textarea className="form-control" rows="3"></textarea>
            </div>
            <button
              className="btn  w-100 "
              style={{ backgroundColor: "#8B4513", color: "white" }}
            >
              Submit Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
