const { Schema, model } = require("mongoose");

const ClientSchema = new Schema({
  name: { type: String, required: true },
  substations: [{ name: { type: String, required: true }, info: String }],
  people: [
    {
      name: { type: String, required: true },
      position: { type: String, required: true },
      phones: [String],
      email: [String],
      info: String,
    },
  ],
  contacts: [
    {
      name: { type: String, required: true },
      phones: [String],
      email: [String],
    },
  ],
});

module.exports = model("Client", ClientSchema);
