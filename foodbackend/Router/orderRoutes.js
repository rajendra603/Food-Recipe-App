import express from "express";
import { MongoClient } from "mongodb";

const router = express.Router();
const url =
  "mongodb+srv://bansodrajendra23:rajendra23@cluster0.dtuzx.mongodb.net/";
const dbName = "FoodApp";

// 📌 Place Order Route
router.post("/placeorder", async (req, res) => {
  const { email, orderData } = req.body;

  if (!email || !orderData || orderData.length === 0) {
    return res
      .status(400)
      .json({ message: "Invalid request. Email or order data missing!" });
  }

  try {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    const ordersCollection = db.collection("orders");

    // ✅ Store the Correct Total Amount
    let totalAmount = orderData.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    const order = {
      email,
      orderData,
      totalAmount, // ✅ Store total amount in database
      date: new Date(),
      status: "Pending",
    };

    console.log("✅ Placing Order:", order);

    await ordersCollection.insertOne(order);
    await client.close();

    res.json({
      success: true,
      message: "Order placed successfully",
      totalAmount,
    });
  } catch (error) {
    console.error("❌ Error placing order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 📌 Fetch Order History Route
router.get("/orderhistory/:email", async (req, res) => {
  const { email } = req.params;

  if (!email) {
    return res
      .status(400)
      .json({ message: "Invalid request. Email is missing!" });
  }

  try {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    const ordersCollection = db.collection("orders");

    console.log("📌 Fetching orders for:", email);

    const orders = await ordersCollection.find({ email }).toArray();

    console.log("✅ Orders Found:", orders);
    await client.close();

    res.json({ success: true, orders });
  } catch (error) {
    console.error("❌ Error fetching order history:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
