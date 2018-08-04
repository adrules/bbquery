const express = require('express');
const router = express.Router();
const requestsController = require('../controllers/requests.controller');

router.post('/create', requestsController.doCreate);

module.exports = router;