import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../Components/Navbar";

export default function Login() {
  const [credential, setcredential] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handlesubmit = async (e) => {
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
      if (!json.success) {
        toast.error(json.message || "Login failed!");
      } else {
        toast.success(json.message || "Login successful!");
        localStorage.setItem("authToken", json.authToken);
        console.log(localStorage.getItem("authToken"));
        navigate("/");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("There was an error. Please try again.");
    }
  };
  const onchange = (event) => {
    setcredential({ ...credential, [event.target.name]: event.target.value });
  };
  return (
    <div
      style={{
        background: "linear-gradient(to bottom, white,rgb(126, 81, 88))",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <div className="container-fluid">
        <form className="mx-auto" onSubmit={handlesubmit}>
          <h2 className="text-center">Login</h2>
          <div className="mb-3 mt-5 text-black fs-5">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              placeholder="Enter your Email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={credential.email}
              onChange={onchange}
            />
            <div id="emailHelp" className="form-text"></div>
          </div>
          <div className="mb-3 text-black fs-5">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={credential.password}
              onChange={onchange}
            />
          </div>

          <button
            type="submit"
            className="w-100 mt-3 btn  rounded-5"
            style={{
              backgroundColor: "#8B4513",
              color: "white",
            }}
          >
            Login
          </button>
          <Link
            to={"/createuser"}
            className="w-100 mt-3 btn btn-danger rounded-5"
          >
            New User-Sing Up
          </Link>
        </form>
      </div>
    </div>
  );
}
