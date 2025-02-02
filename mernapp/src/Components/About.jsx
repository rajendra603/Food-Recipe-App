import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div>
      <Navbar />
      <div class="container m-auto mt-5">
        <div class="row">
          <div class="col-5">
            <img
              width="100%"
              src="https://img.freepik.com/free-vector/call-center-concept-illustration_114360-2184.jpg?t=st=1738517153~exp=1738520753~hmac=e6c0d89752f5fa519fb60aa09428dd93d0052abbb4275670926d823ee2bf163a&w=740"
              alt="Project"
            />
          </div>
          <div class="col-7">
            <p>
              <span className="fs-1 text-primary fw-semibold">
                Tasty Bites{" "}
              </span>
              is the Food App is a robust full-stack web application developed
              as my Capstone Project for the{" "}
              <b className="text-primary">
                Upgrad - Knowledgehut Full-Stack Bootcamp.{" "}
              </b>
              This solution utilizes the MERN stack, with React powering the
              front-end, MongoDB serving as the database, and Express and
              Node.js handling the back-end architecture.
            </p>
            <h3 className="text-primary">Front-End</h3>
            <p>
              The front-end is developed with React, utilizing React Router for
              seamless navigation. Data caching is managed with React Query,
              while styling is handled using Bootstrap and custom CSS. The Toast
              library is integrated for efficient notification handling.
            </p>
            <h3 className="text-primary">Back-End</h3>
            <p>
              The back-end is built on the Express framework for Node.js.
              MongoClient is used to interact with MongoDB Atlas, Express
              Validator is used for validation, and Express Session is utilized
              for session management.
            </p>
            <Link
              className=" w-100 btn btn-primary"
              to="https://www.linkedin.com/in/rajendra-bansod06/"
              target="_blank"
            >
              Linkedin Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
