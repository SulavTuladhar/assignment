var router = require('express').Router();

const userController = require('./user.controller');

router.route('/')
    .get(userController.fetchUser)
    .put(userController.updateUser)

module.exports = router;