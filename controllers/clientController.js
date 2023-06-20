const UserModel = require("../models/User.js");
const ClientModel = require("../models/Client.js");
const { omitId } = require("../utils/utils.js");

class clientController {
  async getClients(req, res) {
    const id = req.userId;
    const user = await UserModel.findById(id).populate("clients").exec();
    res.json(user.clients);
  }

  async getClient(req, res) {
    try {
      const userId = req.userId;
      const clientId = req.params.id;

      const user = await UserModel.findById(userId)
        .populate({
          path: "clients",
        })
        .exec();
      const client = user.clients.find(
        (client) => client._id.toString() === clientId
      );
      res.json(client);
    } catch (e) {
      console.log(e.message);
    }
  }

  async createClient(req, res) {
    try {
      const userId = req.userId;

      const editedBody = omitId(req.body);
      const doc = new ClientModel({
        name: editedBody.name,
        substations: editedBody.substations,
        people: editedBody.people,
        contacts: editedBody.contacts,
      });

      const client = await doc.save();
      const user = await UserModel.findById(userId);
      user.clients.push(client._id);
      await user.save();

      res.json(client);
    } catch (e) {
      console.log(e.message);
    }
  }

  async updateClient(req, res) {
    try {
      const clientId = req.params.id;

      const client = await ClientModel.findOneAndReplace(
        { _id: clientId },
        {
          name: req.body.name,
          substations: req.body.substations,
          people: req.body.people,
          contacts: req.body.contacts,
        },
        {
          returnDocument: "after",
        }
      );
      res.json(client);
    } catch (e) {
      console.log(e.message);
    }
  }

  async deleteClient(req, res) {
    const userId = req.userId;
    const clientId = req.params.id;

    const client = await ClientModel.findByIdAndDelete(clientId);
    if (!client) {
      return res.status(404).json("Потребитель не найден");
    }
    const user = await UserModel.findById(userId);
    const newClientList = user.clients.filter(
      (id) => id.toString() !== clientId
    );
    user.clients = newClientList;
    await user.save();

    res.json({
      success: true,
    });
  }
}

module.exports = new clientController();
