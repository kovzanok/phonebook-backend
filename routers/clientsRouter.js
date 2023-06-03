const Router = require("express");
const checkAuth = require("../middleware/checkAuth.js");
const clientController = require("../controllers/clientController.js");

const router = new Router();

router.get("/all", checkAuth, clientController.getClients);
router.get("/:id", checkAuth, clientController.getClient);
router.post("/new", checkAuth, clientController.createClient);
router.put("/:id", checkAuth, clientController.updateClient);
router.delete("/:id", checkAuth, clientController.deleteClient);
