// DEPENDENCIES
const express = require("express");
const cors = require("cors");
// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(express.json()); // Parse incoming JSON
app.use(cors());

// ROUTES
app.get("/", (req, res) => {
  res.status(200).send("Welcome to Captain's Log");
});

const logsController = require("./controllers/logsController.js");
app.use("/logs", logsController);

// 404 PAGE
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

// EXPORT
module.exports = app;
