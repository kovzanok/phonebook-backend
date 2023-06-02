const authController= require('../controllers/authController.js')
const Router = require('express');
const router = new Router();


router.post('/registration',authController.registration);
router.post('/login',authController.login);
router.get('/users',authController.getUsers);

module.exports = router