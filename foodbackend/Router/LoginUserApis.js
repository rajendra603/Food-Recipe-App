import { Router } from "express";
import { MongoClient } from "mongodb";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretkey = process.env.JWT_SECRET || "default_secret_key";
const client = new MongoClient(
  process.env.MONGO_URI ||
    "mongodb+srv://bansodrajendra23:rajendra23@cluster0.dtuzx.mongodb.net/"
);
const dbName = "FoodApp";
const LoginRouter = Router();

LoginRouter.post(
  "/loginuser",
  [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;
    try {
      await client.connect();
      const db = client.db(dbName);

      const user = await db.collection("user").findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid credentials" });
      }

      const data = {
        user: {
          id: user._id.toString(),
        },
      };

      const authToken = jwt.sign(data, secretkey, { expiresIn: "1h" });
      res.json({
        success: true,
        message: "Login successful",
        authToken,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        success: false,
        message: "Server error, please try again.",
      });
    }
  }
);

export { LoginRouter };
