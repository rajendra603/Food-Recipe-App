import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [credential, setcredential] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/loginuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credential.email,
          password: credential.password,
        }),
      });
      const json = await response.json();
      console.log(json);
      if (!json.success) {
        alert(json.message);
      } else {
        alert(json.message);
        localStorage.setItem("authToken", json.authToken);
        console.log(localStorage.getItem("authToken"));
        navigate("/");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("There was an error. Please try again.");
    }
  };
  const onchange = (event) => {
    setcredential({ ...credential, [event.target.name]: event.target.value });
  };
  return (
    <div
      className="  d-flex justify-content-center align-items-center vh-100 bg-light"
      style={{}}
    >
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          width: "350px",
          height: "400px",
          borderRadius: "10px",
          backgroundColor: "darkgray",
        }}
      >
        <form onSubmit={handlesubmit}>
          <div className="mb-3 text-black fs-5">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
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
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={credential.password}
              onChange={onchange}
            />
          </div>

          <button type="submit" className=" m-3 btn btn-success">
            Submit
          </button>
          <Link to={"/createuser"} className=" m-3 btn btn-danger">
            New User
          </Link>
        </form>
      </div>
    </div>
  );
}
