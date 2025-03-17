require('dotenv').config()
const express = require("express");
const app = express();
const jobRouter = require("./routes/propertyRouter");
const { unknownEndpoint,errorHandler } = require("./middleware/customMiddleware");
const connectDB = require("./config/db");
const cors = require("cors");

// Middlewares
app.use(cors())
app.use(express.json());

// Connect to the database
connectDB();

// Use the jobRouter for all "/jobs" routes
app.use("/api/properties", jobRouter);

// Middlewares
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
