import React, { useState, useEffect, useRef } from "react";
import { useDispatchCart, useCart } from "./ContestReducer";

export default function Card(props) {
  const dispatch = useDispatchCart();
  const data = useCart();
  const options = props.options || {};
  const priceRef = useRef();
  const priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  useEffect(() => {
    if (priceRef.current) {
      setSize(priceRef.current.value);
    }
  }, []);

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
    console.log(food);
    console.log(new Date());

    if (food.length > 0) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.foodItem.img,
        });
        console.log("Size different so simply ADD one more to the list");
        return;
      }
      return;
    }

    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
      img: props.foodItem.img,
    });

    // setBtnEnable(true)
  };

  let finalPrice = qty * (options[size] || 0); // Use default 0 if size is not selected

  return (
    <div className="card-container">
      <div
        className="card mt-4"
        style={{ width: "18rem", maxHeight: "500px", overflow: "hidden" }}
      >
        <img
          src={props.foodItem.img}
          className="card-img-top"
          alt="FoodImg"
          style={{ height: "180px", objectFit: "fill" }}
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <h5
            className="card-title"
            style={{
              color: "#8B4513",
            }}
          >
            {props.foodItem.name}
          </h5>
          <p className="card-text">A perfect blend of taste and quality.</p>
          <div className="container w-100">
            <select
              style={{
                backgroundColor: "#8B4513",
                color: "white",
              }}
              className="m-2 h-100  rounded"
              onChange={(e) => setQty(parseInt(e.target.value))}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              style={{
                backgroundColor: "#8B4513",
                color: "white",
              }}
              className="m-2 h-100 rounded"
              onChange={(e) => setSize(e.target.value)}
              ref={priceRef}
            >
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <div className="d-inline fs-5">₹{finalPrice}/-</div>
          </div>
          <hr />
          <button
            className="btn btn-success w-100"
            style={{
              backgroundColor: "#8B4513",
            }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
