import { MongoClient } from "mongodb";

const mongoURI =
  "mongodb+srv://bansodrajendra23:rajendra23@cluster0.dtuzx.mongodb.net/";

export const mongoDB = async () => {
  const client = new MongoClient(mongoURI); // No need to include deprecated options

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("FoodApp");

    const sampleDataCollection = database.collection("SampleData");
    const sampleData = await sampleDataCollection
      .find({})
      .sort({ CategoryName: 1 })
      .toArray();
    global.SampleData = sampleData;

    const categoryCollection = database.collection("category");
    const categoryData = await categoryCollection
      .find({})
      .sort({ CategoryName: 1 })
      .toArray();
    global.CategoryData = categoryData;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  } finally {
    await client.close();
  }
};

mongoDB();
