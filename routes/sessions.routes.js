const express = require('express');
const router = express.Router();
const sessionsController = require('../controllers/sessions.controller');

router.get('/login', sessionsController.login);
router.post('/login', sessionsController.doLogin);

router.get('/logout', sessionsController.logout);

module.exports = router;