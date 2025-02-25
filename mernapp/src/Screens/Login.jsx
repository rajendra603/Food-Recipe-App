import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../Components/Navbar";

export default function Login() {
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://food-app-00un.onrender.com/loginuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credential.email,
            password: credential.password,
          }),
        }
      );

      const json = await response.json();
      console.log(json);

      if (!json || !json.success) {
        toast.error(json.message || "Login failed!");
      } else {
        toast.success(json.message || "Login successful!");

        //  Store token & email in localStorage
        localStorage.setItem("authToken", json.authToken);
        localStorage.setItem("userEmail", credential.email);

        console.log("Auth Token:", localStorage.getItem("authToken"));
        console.log("User Email:", localStorage.getItem("userEmail"));

        navigate("/");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("There was an error. Please try again.");
    }
  };

  const handleChange = (event) => {
    setCredential({ ...credential, [event.target.name]: event.target.value });
  };

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, white, rgb(126, 81, 88))",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <div
        className="container-fluid d-flex align-items-center justify-content-center"
        style={{ height: "80vh" }}
      >
        <form
          className="p-4 border rounded bg-white shadow"
          style={{ width: "100%", maxWidth: "400px" }}
          onSubmit={handleSubmit}
        >
          <h2 className="text-center">Login</h2>

          <div className="mb-3 text-black fs-5">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              name="email"
              value={credential.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 text-black fs-5">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              name="password"
              value={credential.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-100 mt-3 btn rounded-5"
            style={{ backgroundColor: "#8B4513", color: "white" }}
          >
            Login
          </button>

          <Link
            to={"/createuser"}
            className="w-100 mt-3 btn btn-danger rounded-5"
          >
            New User - Sign Up
          </Link>
        </form>
      </div>
    </div>
  );
}
