import { Router } from "express";
import { MongoClient } from "mongodb";

export const getuserRouter = Router();
getuserRouter.get("/get-user", async (req, res) => {
  try {
    const client = new MongoClient(
      "mongodb+srv://bansodrajendra23:rajendra23@cluster0.dtuzx.mongodb.net/"
    );
    const connection = await client.connect();
    const db = connection.db("FoodApp");

    const output = await db.collection("user").find().toArray();
    res.send(output);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Server Error");
  }
});
