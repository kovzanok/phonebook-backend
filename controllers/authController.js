class authController {
  async registration(req, res) {
    try {
    } catch (e) {
      console.log(e.message);
    }
  }

  async login(req, res) {
    try {
    } catch (e) {
      console.log(e.message);
    }
  }

  async getUsers(req, res) {
    try {
      res.json("server");
    } catch (e) {
      console.log(e.message);
    }
  }
}

module.exports = new authController();
