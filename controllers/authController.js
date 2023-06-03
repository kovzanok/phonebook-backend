const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const genrateAccessToken = (id) => {
  const payload = { id };
  return jwt.sign(payload, "secret123", { expiresIn: "24h" });
};

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Ошибка при регистрации", errors });
      }
      const { login, password } = req.body;
      const candidate = await User.findOne({ login });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким логином уже существует" });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userDoc = new User({ login, password: hashPassword, clients: [] });
      const user = await userDoc.save();
      const token = genrateAccessToken(user._id);
      return res.json({ token, userLogin: user.login });
    } catch (e) {
      console.log(e.message);
      res.status(400).json({ message: "Ошибка регистрации" });
    }
  }

  async login(req, res) {
    try {
      const { login, password } = req.body;
      const user = await User.findOne({ login });
      if (!user) {
        return res
          .status(400)
          .json({ message: `Пользователь ${login} не найден` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: `Неверный логин или пароль` });
      }

      const token = genrateAccessToken(user._id);
      res.json({ token, userLogin: user.login });
    } catch (e) {
      console.log(e.message);
      res.status(400).json({ message: "Ошибка авторизации" });
    }
  }

  async authMe(req, res) {
    const userId = req.userId;
    try {
      const user = await User.findById(userId);
      if (user) {
        return res.json({ login: user.login });
      }
      res.status(400).json({ message: "Нет доступа" });
    } catch (e) {
      console.log(e.message);
    }
  }
}

module.exports = new authController();
