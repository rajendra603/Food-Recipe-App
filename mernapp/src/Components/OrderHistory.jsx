import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!userEmail) {
      toast.error("User not logged in!");
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `https://food-app-00un.onrender.com/orderhistory/${userEmail}`
        );
        const data = await response.json();

        if (data.success) {
          setOrders(data.orders);
        } else {
          toast.error("Failed to fetch orders!");
        }
      } catch (error) {
        console.error("Error fetching order history:", error);
        toast.error("Something went wrong!");
      }
    };

    fetchOrders();
  }, [userEmail, navigate]);

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
          Order History
        </h2>

        {orders.length === 0 ? (
          <div className="text-center mt-5">
            <h3 className="text-danger">No orders found!</h3>
          </div>
        ) : (
          orders.map((order, orderIndex) => (
            <div key={orderIndex} className="mb-4 p-3 border">
              <h4>Order Date: {new Date(order.date).toLocaleString()}</h4>
              <h5>Status: {order.status}</h5>

              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Option</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderData.map((food, index) => (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{food.name}</td>
                      <td>{food.qty}</td>
                      <td>{food.size}</td>
                      <td>₹{food.price * food.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* ✅ Show Total Amount Directly from Backend */}
              <h3
                className="text-end"
                style={{ backgroundColor: "#8B4513", color: "white" }}
              >
                Total Price: ₹{order.totalAmount}
              </h3>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
