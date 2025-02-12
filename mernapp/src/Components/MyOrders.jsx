import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyOrders() {
  const [orderData, setOrderData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cartData"));
    if (cartData) {
      setOrderData(cartData);
    }
  }, []);

  if (orderData.length === 0) {
    return (
      <div className="text-center mt-5">
        <h3 className="text-danger">No orders placed yet!</h3>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  let totalPrice = orderData.reduce((total, food) => total + food.price, 0);

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, white,rgb(126, 81, 88))",
        minHeight: "100vh",
      }}
    >
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
        <h2
          className="text-center"
          style={{
            backgroundColor: "#8B4513",
            color: "white",
          }}
        >
          My Orders
        </h2>
        <table className="table table-hover">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col">.</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            {orderData.map((food, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h1
          className="fs-2 text-end  "
          style={{
            backgroundColor: "#8B4513",
            color: "white",
          }}
        >
          Total Price: {totalPrice}/-
        </h1>
        <div>
          <button
            className="btn "
            style={{
              backgroundColor: "#8B4513",
              color: "white",
            }}
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
