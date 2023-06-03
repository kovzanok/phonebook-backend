const UserModel = require("../models/User.js");
const ClientModel = require("../models/Client.js");

class clientController {
  async getClients(req, res) {
    const id = req.userId;
    const user = await UserModel.findById(id).populate("clients").exec();
    res.json(user.clients);
  }

  async getClient(req,res) {}

  async createClient(req, res) {}

  async updateClient(req, res) {}

  async deleteClient(req,res) {}
}

module.exports = new clientController();
