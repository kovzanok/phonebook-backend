const authController = require("../controllers/authController.js");
const Router = require("express");
const { check } = require("express-validator");

const router = new Router();

router.post(
  "/registration",
  [
    check("login", "Введите логин").notEmpty(),
    check("password", "Минимальная длина пароля 5 символов").isLength({
      min: 5,
    }),
  ],
  authController.registration
);
router.post("/login", authController.login);
router.get("/users", authController.getUsers);

module.exports = router;
