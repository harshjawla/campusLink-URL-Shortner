require("dotenv").config();
const express = require("express");
const routes = require("./routes/routes");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
const PORT = 4000;
const URL = process.env.MONGODB_URL;

mongoose.connect(URL);

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
