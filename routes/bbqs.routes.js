const express = require('express');
const router = express.Router();
const bbqsController = require('../controllers/bbqs.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const multer = require('multer');
const upload = multer({ dest: './public/images/bbqs/uploads' });

router.get('/create', authMiddleware.isAuthenticated, authMiddleware.isActive, bbqsController.create);
router.post('/create', authMiddleware.isAuthenticated, authMiddleware.isActive, upload.single('photo'), bbqsController.doCreate);

router.get('/locations', bbqsController.getBbqsLocations);
router.get('/:id/location', bbqsController.getBbqLocation);

router.post('/review', bbqsController.review);

router.get('/list', bbqsController.list);

router.get('/', bbqsController.list);

router.get('/:id', bbqsController.get);

module.exports = router;
