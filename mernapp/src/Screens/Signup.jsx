import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../Components/Navbar";

export default function Signup() {
  const [credential, setcredential] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://food-app-00un.onrender.com/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credential.name,
            email: credential.email,
            password: credential.password,
          }),
        }
      );
      const json = await response.json();
      console.log(json);
      if (response.status !== 200) {
        if (json.errors) {
          toast.error(json.errors.map((error) => error.msg).join("\n"));
        } else {
          toast.error("Something went wrong, please try again.");
        }
      } else {
        toast.success("Signup successful!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during signup:", error);
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
          <h2 className="text-center">Sign Up</h2>
          <div className="mb-3 mt-5 text-black fs-5">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              name="name"
              value={credential.name}
              onChange={onchange}
            />
          </div>

          <div className="mb-3 text-black fs-5">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your Email"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={credential.email}
              onChange={onchange}
            />
          </div>
          <div className="mb-3 fs-5">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your password"
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
            SignUp
          </button>
          <Link to={"/login"} className=" w-100 mt-3 btn btn-danger rounded-5">
            Already a User
          </Link>
        </form>
      </div>
    </div>
  );
}
