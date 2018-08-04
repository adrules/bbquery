const express = require('express');
const router = express.Router();
const requestsController = require('../controllers/requests.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/create', authMiddleware.isAuthenticated, requestsController.doCreate);

module.exports = router;