import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function MyOrders() {
  const [orderData, setOrderData] = useState([]);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    console.log("Logged-in User Email:", userEmail);
    if (!userEmail) {
      toast.error("User not logged in!");
      navigate("/login");
    } else {
      const cartData = JSON.parse(localStorage.getItem("cartData"));
      if (cartData) {
        setOrderData(cartData);
      }
    }
  }, [userEmail, navigate]);

  const handlePlaceOrder = async () => {
    if (orderData.length === 0) {
      toast.error("No items in cart to place order!");
      return;
    }

    try {
      const response = await fetch(
        "https://food-app-00un.onrender.com/placeorder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userEmail,
            orderData,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Order placed successfully!");
        localStorage.removeItem("cartData");
        setOrderData([]);
        navigate("/orderhistory");
      } else {
        toast.error("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Something went wrong!");
    }
  };

  if (!userEmail) return null;

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, white, rgb(126, 81, 88))",
        minHeight: "100vh",
      }}
    >
      <div className="container m-auto mt-5 table-responsive">
        <h2
          className="text-center"
          style={{ backgroundColor: "#8B4513", color: "white" }}
        >
          My Orders
        </h2>

        {orderData.length === 0 ? (
          <div className="text-center mt-5">
            <h3 className="text-danger">No orders placed yet!</h3>
            <button
              className="btn btn-primary mt-3"
              onClick={() => navigate("/")}
            >
              Back to Home
            </button>
          </div>
        ) : (
          <>
            <table className="table table-hover">
              <thead className="text-success fs-4">
                <tr>
                  <th scope="col">#</th>
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
              className="fs-2 text-end"
              style={{ backgroundColor: "#8B4513", color: "white" }}
            >
              Total Price:{" "}
              {orderData.reduce((total, food) => total + food.price, 0)}/-
            </h1>

            <div>
              <button
                className="btn btn-success"
                style={{
                  marginRight: "5px",
                }}
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
              <button className="btn btn-danger" onClick={() => navigate("/")}>
                Back to Home
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
