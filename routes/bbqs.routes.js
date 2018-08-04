const express = require('express');
const router = express.Router();
const bbqsController = require('../controllers/bbqs.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/create', bbqsController.create);
router.post('/create', authMiddleware.isAuthenticated, bbqsController.doCreate);

router.get('/:id', bbqsController.get);

router.get('/list', bbqsController.list);

module.exports = router;