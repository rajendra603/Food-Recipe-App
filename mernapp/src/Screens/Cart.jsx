import React from "react";
import { useCart, useDispatchCart } from "../Components/ContestReducer";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  const navigate = useNavigate();
  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3 text-danger">
          The Cart is empty
        </div>
      </div>
    );
  }
  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  const handleCheckout = () => {
    localStorage.setItem("cartData", JSON.stringify(data));

    dispatch({ type: "CLEAR" });

    navigate("/myorders");
  };

  return (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
        <table className="table table-hover">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button
                    type="button"
                    className="btn p-0"
                    onClick={() => {
                      dispatch({ type: "REMOVE", index: index });
                    }}
                  >
                    <FaTrash style={{ color: "red", fontSize: "1.5rem" }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">Total Price :{totalPrice}/-</h1>
        </div>
        <div>
          <button className="btn bg-success mt-5" onClick={handleCheckout}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}
