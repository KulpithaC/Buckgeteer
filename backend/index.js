const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
