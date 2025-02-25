import express from "express";
import { CreateUserRoutes } from "./Router/CreateUserApis.js";
import { displayapis } from "./Router/DisplayData.js";
import { getuserRouter } from "./Router/getUserApi.js";
import cors from "cors";
import { LoginRouter } from "./Router/LoginUserApis.js";
import { mongoDB } from "./db.js";
import orderRoutes from "./Router/orderRoutes.js";

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors());
app.use(express.json());

const startServer = async () => {
  try {
    await mongoDB();
    console.log("MongoDB Data Fetched Successfully!");

    app.use("/", CreateUserRoutes);
    app.use("/", displayapis);
    app.use("/", getuserRouter);
    app.use("/", LoginRouter);
    app.use("/", orderRoutes);

    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
  } catch (error) {
    console.error("Error in connecting to MongoDB", error);
  }
};

startServer();
