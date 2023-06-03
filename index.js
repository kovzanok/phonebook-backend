const express = require("express");
const mongoose = require('mongoose');
const authRouter = require("./routers/authRouter.js");
const clientsRouter = require("./routers/clientsRouter.js");
const cors = require("cors");

const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/clients", clientsRouter);
const start = () => {
  try {
    app.listen(PORT, async () => {
      await mongoose.connect(
        "mongodb+srv://phonebookuser:phonebookpassword@cluster0.eqsxfo6.mongodb.net/phonebook?retryWrites=true&w=majority"
      );
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
