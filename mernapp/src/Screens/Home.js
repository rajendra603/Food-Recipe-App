import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";
import BurgerImg from "./Images/burger.jpg";
import FrenchFries from "./Images/frenchfries.jpg";
import Pizza from "./Images/Pizza.jpg";

export default function Home() {
  const [search, setsearch] = useState("");
  const [foodCat, setfoodCat] = useState([]);
  const [foodItem, setfoodItem] = useState([]);

  // Update to use GET request to fetch data
  const loadData = async () => {
    try {
      let response = await fetch(
        "https://food-app-00un.onrender.com/foodData",
        {
          method: "GET", // Use GET to fetch data
        }
      );
      const data = await response.json();
      console.log(data); // Log the response structure to check it
      setfoodItem(data[0]); // Assuming the response structure is [foodItems, foodCategories]
      setfoodCat(data[1]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleCaptions"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={BurgerImg}
                className="d-block w-100"
                alt="Pizza"
                style={{
                  height: "500px",
                  objectFit: "cover",
                  filter: "brightness(65%)",
                }}
              />
              <div className="carousel-caption d-none d-md-block">
                <div className="d-flex justify-content-center">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => {
                      setsearch(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src={FrenchFries}
                className="d-block w-100"
                alt="FrenchFries"
                style={{
                  height: "500px",
                  objectFit: "cover",
                  filter: "brightness(65%)",
                }}
              />
              <div className="carousel-caption d-none d-md-block">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setsearch(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="carousel-item">
              <img
                src={Pizza}
                className="d-block w-100"
                alt="BurgerImg"
                style={{
                  height: "500px",
                  objectFit: "cover",
                  filter: "brightness(65%)",
                }}
              />
              <div className="carousel-caption d-none d-md-block">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setsearch(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="container">
        {foodCat.length > 0 ? (
          foodCat.map((data, index) => {
            return (
              <div className="row mb-3" key={data._id}>
                <div className="fs-3 m-3">{data.CategoryName}</div>
                <hr />
                {foodItem.length > 0 ? (
                  foodItem
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name.toLowerCase().includes(search)
                    )
                    .map((filterItems) => {
                      return (
                        <div
                          key={filterItems._id}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <Card
                            foodItem={filterItems}
                            options={filterItems.options[0]}
                          ></Card>
                        </div>
                      );
                    })
                ) : (
                  <div>No such Data found</div>
                )}
              </div>
            );
          })
        ) : (
          <div>No data available</div>
        )}
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
