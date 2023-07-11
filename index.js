const express = require("express");
const mongoose = require('mongoose');
const authRouter = require("./routers/authRouter.js");
const clientsRouter = require("./routers/clientsRouter.js");
const cors = require("cors");
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/clients", clientsRouter);

const PORT = process.env.PORT || 3000;
const start = () => {
  try {
    app.listen(PORT, async () => {
      await mongoose.connect(
        process.env.DB_URL
      );
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
