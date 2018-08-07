const express = require('express');
const router = express.Router();
const requestsController = require('../controllers/requests.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/create', authMiddleware.isAuthenticated, authMiddleware.isActive, requestsController.doCreate);

router.get('/accept', authMiddleware.isAuthenticated, authMiddleware.isActive, requestsController.doAccept);

module.exports = router;