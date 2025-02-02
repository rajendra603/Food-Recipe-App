import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Navbar from "./Navbar";
export default function Contact() {
  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2 className="text-center mb-4 text-primary">Get in Touch</h2>
        <div className="row justify-content-center">
          <div className="col-md-5 p-4 border rounded shadow me-md-4">
            <h4 className="text-center mb-3 text-primary"> Contact</h4>
            <p>
              <FaMapMarkerAlt className="me-2 text-primary" /> Lorem ipsum dolor
              sit amet consectetur adipisicing. Country
            </p>
            <p>
              <FaPhone className="me-2 text-primary" /> +91 **********
            </p>
            <p>
              <FaEnvelope className="me-2 text-primary" /> owner@example.com
            </p>
            <h5 className="mt-4 text-primary">Delivery Timings </h5>
            <p>Monday - Friday: 9 AM - 11 PM</p>
            <p>Saturday - Sunday: 10 AM - 11 PM</p>
          </div>

          <div className="col-md-5 p-4 border rounded shadow">
            <h4 className="text-center mb-3 text-primary">Feedback</h4>
            <p className="text-muted text-center">
              We value your feedback! Let us know your experience.
            </p>
            <div className="mb-3">
              <label className="form-label">Rate Us</label>
              <select className="form-select">
                <option>⭐ 1 - Poor</option>
                <option>⭐⭐ 2 - Fair</option>
                <option>⭐⭐⭐ 3 - Good</option>
                <option>⭐⭐⭐⭐ 4 - Very Good</option>
                <option>⭐⭐⭐⭐⭐ 5 - Excellent</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Comments</label>
              <textarea className="form-control" rows="3"></textarea>
            </div>
            <button className="btn btn-primary w-100 ">Submit Feedback</button>
          </div>
        </div>
      </div>
    </div>
  );
}
