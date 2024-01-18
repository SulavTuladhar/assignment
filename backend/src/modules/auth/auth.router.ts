var router = require('express').Router();

const authController = require('./auth.controller');

router.route('/login')
    .post(authController.login)

router.route('/register')
    .post(authController.registerUser)

module.exports = router;