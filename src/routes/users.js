const express = require('express');

const userController = require('../controllers/userController.js');

let router = express.Router();

router.get('/login', userController.login);
router.get('/register', userController.register);


module.exports = router;
