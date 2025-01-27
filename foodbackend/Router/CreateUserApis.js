import { Router } from "express";
import { MongoClient } from "mongodb";
import { body, check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";

export const CreateUserRoutes = Router();

CreateUserRoutes.post(
  "/createuser",

  body("email").isEmail().withMessage("Email must be valid").normalizeEmail(),
  body("username")
    .isString()
    .withMessage("username should be string and should be required"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    const { email, username, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const secpassword = await bcrypt.hash(password, salt);
    try {
      const client = new MongoClient(
        "mongodb+srv://bansodrajendra23:rajendra23@cluster0.dtuzx.mongodb.net/"
      );
      const connection = await client.connect();
      const db = connection.db("FoodApp");
      await db
        .collection("user")
        .insertOne({ email, username, password: secpassword });
      res.send({ success: true });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Server error, please try again.",
      });
    }
  }
);
