const express = require('express');
const router = express.Router();
const bbqsController = require('../controllers/bbqs.controller');

router.get('/create', bbqsController.create);
router.post('/create', bbqsController.doCreate);

module.exports = router;