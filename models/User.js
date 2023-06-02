const { Schema, model } = require("mongoose");

const User = new Schema({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  clients: [{ type: Schema.Types.ObjectId, ref: "Client" }],
});

module.exports = model("User", User);
