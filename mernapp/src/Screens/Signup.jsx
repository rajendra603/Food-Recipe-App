import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
          alert(json.errors.map((error) => error.msg).join("\n"));
        } else {
          alert("Something went wrong, please try again.");
        }
      } else {
        alert("Signup successful!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("There was an error. Please try again.");
    }
  };
  const onchange = (event) => {
    setcredential({ ...credential, [event.target.name]: event.target.value });
  };
  return (
    <div
      className="  d-flex justify-content-center align-items-center vh-100 bg-light"
      style={{ margin: 0 }}
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
          <div className="mb-3 fs-5">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credential.name}
              onChange={onchange}
            />
          </div>

          <div className="mb-3 fs-5">
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
          </div>
          <div className="mb-3 fs-5">
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
          <Link to={"/login"} className=" m-3 btn btn-danger">
            Already a User
          </Link>
        </form>
      </div>
    </div>
  );
}
