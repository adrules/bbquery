const express = require('express');
const router = express.Router();
const bbqsController = require('../controllers/bbqs.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/create', authMiddleware.isAuthenticated, authMiddleware.isActive, bbqsController.create);
router.post('/create', authMiddleware.isAuthenticated, authMiddleware.isActive, bbqsController.doCreate);

router.get('/:id', bbqsController.get);

module.exports = router;