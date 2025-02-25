import express from "express";
import { MongoClient } from "mongodb";

const router = express.Router();
const url =
  "mongodb+srv://bansodrajendra23:rajendra23@cluster0.dtuzx.mongodb.net/";
const dbName = "FoodApp";

router.post("/placeorder", async (req, res) => {
  const { email, orderData } = req.body;

  if (!email || !orderData.length) {
    return res.status(400).json({ message: "Invalid request" });
  }

  try {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    const ordersCollection = db.collection("orders");

    const order = {
      email,
      orderData,
      date: new Date(),
    };

    await ordersCollection.insertOne(order);
    await client.close();

    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/orderhistory/:email", async (req, res) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({ message: "Invalid request" });
  }

  try {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    const ordersCollection = db.collection("orders");

    console.log("Fetching orders for email:", email);

    const orders = await ordersCollection.find({ email }).toArray();

    console.log("Orders Found:", orders);
    await client.close();
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching order history:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
