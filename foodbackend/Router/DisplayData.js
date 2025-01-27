import { Router } from "express";

export const displayapis = Router();

displayapis.post("/foodData", async (req, res) => {
  try {
    res.send([global.SampleData, global.CategoryData]);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});
