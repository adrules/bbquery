const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

router.get('/create', usersController.create);
router.post('/create', usersController.doCreate);

router.get('/login', usersController.login);
router.post('/login', usersController.doLogin);

module.exports = router;