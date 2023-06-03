const UserModel = require("../models/User.js");
const ClientModel = require("../models/Client.js");

class clientController {
  async getClients(req, res) {
    const id = req.userId;
    const user = await UserModel.findById(id).populate("clients").exec();
    res.json(user.clients);
  }

  async getClient(req, res) {
    try {
      const id = req.userId;
      const clientId = req.params.id;

      const user = await UserModel.findById(id).populate({
        path: "clients",
        id: { $eq: clientId },
      });
      const client = user.clients[0];
      res.json(client);
    } catch (e) {
      console.log(e.message);
    }
  }

  async createClient(req, res) {
    try {
      const id = req.userId;

      const doc = new ClientModel({
        name: req.body.name,
        substations: req.body.substations,
        people: req.body.people,
        contacts: req.body.contacts,
      });

      const client = await doc.save();
      const user = await UserModel.findById(id);
      user.clients.push(client._id);
      await user.save();

      res.json(client);
    } catch (e) {
      console.log(e.message);
    }
  }

  async updateClient(req, res) {}

  async deleteClient(req,res) {}
}

module.exports = new clientController();
