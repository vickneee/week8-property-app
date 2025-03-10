const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Property = require("./models/propertyModel"); // Adjust path as needed
const properties = require("./data/propertyData");

dotenv.config();
const connectDB = require("./config/db"); // Ensure your DB connection is set up

connectDB();

const seedProperties = async () => {
  try {
    await Property.deleteMany(); // Clear existing data
    const createdProperties = await Property.insertMany(properties);
    console.log("Property data seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedProperties();
