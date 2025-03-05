import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderHistory = async () => {
      const userEmail = localStorage.getItem("userEmail");

      if (!userEmail) {
        console.error("User email not found in localStorage");
        return;
      }

      try {
        const response = await fetch(
          `https://food-app-00un.onrender.com/orderhistory/${userEmail}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Order History:", data);

        if (data.success) {
          setOrders(data.orders);
        } else {
          console.error("Failed to fetch order history");
        }
      } catch (error) {
        console.error("Error fetching order history:", error.message);
      }
    };

    fetchOrderHistory();
  }, []);

  return (
    <div className="container mt-5">
      <h2
        className="text-center p-2"
        style={{
          backgroundColor: "#8B4513",
          color: "white",
          borderRadius: "5px",
        }}
      >
        Order History
      </h2>
      <button className="btn btn-success mt-3" onClick={() => navigate("/")}>
        Back to Home
      </button>

      {orders.length === 0 ? (
        <h3 className="text-danger text-center mt-4">
          No order history available!
        </h3>
      ) : (
        <table className="table table-hover mt-4">
          <thead className="text-success fs-4">
            <tr>
              <th>Date & Time</th>
              <th>Items</th>
              <th>Total Amount (₹)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              console.log(`Order ${index + 1} Data:`, order.orderData);

              const totalAmount =
                order.orderData?.reduce((sum, item) => {
                  const totalItemPrice = item?.price
                    ? parseFloat(item.price)
                    : 0;
                  return sum + totalItemPrice;
                }, 0) || 0;

              return (
                <tr key={index}>
                  <td>
                    {order.date ? new Date(order.date).toLocaleString() : "N/A"}
                  </td>
                  <td>
                    {order.orderData?.length > 0 ? (
                      order.orderData.map((item, i) => (
                        <div key={i}>
                          {item.name} ({item.qty} x {item.size}) - ₹
                          {parseFloat(item.price).toFixed(2)}
                        </div>
                      ))
                    ) : (
                      <span className="text-muted">No items available</span>
                    )}
                  </td>
                  <td className="fw-bold">₹{totalAmount.toFixed(2)}</td>
                  <td>
                    <span
                      className="badge"
                      style={{
                        backgroundColor:
                          order.status === "Completed"
                            ? "blue"
                            : order.status === "Pending"
                            ? "orange"
                            : "green",
                        color: "white",
                      }}
                    >
                      {order.status || "Pending"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
