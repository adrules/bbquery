const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/create', usersController.create);
router.post('/create', usersController.doCreate);

router.get('/activate', usersController.activate);

router.get('/testauth', authMiddleware.isAuthenticated, usersController.testAuth);

router.get('/:id', usersController.get);

module.exports = router;