const express = require('express');
const router = express.Router();
const bbqsController = require('../controllers/bbqs.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const multer = require('multer');
const upload = multer({ dest: 'public/images/bbqs/uploads' });
// var cloudinary = require('cloudinary');
// var cloudinaryStorage = require('multer-storage-cloudinary');

router.get('/create', authMiddleware.isAuthenticated, authMiddleware.isActive, bbqsController.create);
router.post('/create', authMiddleware.isAuthenticated, authMiddleware.isActive, upload.single('photo'), bbqsController.doCreate);

router.get('/locations', bbqsController.getBbqsLocations);

router.get('/list', bbqsController.list);
router.get('/', bbqsController.list);

router.get('/:id', bbqsController.get);

router.post('/:id/upload', upload.single('photo'), bbqsController.upload);

// var storage = cloudinaryStorage({
//   cloudinary: cloudinary,
//   folder: 'folder-name',
//   allowedFormats: ['jpg', 'png'],
//   filename: function (req, file, cb) {
//     cb(undefined, 'my-file-name');
//   }
// });

// var parser = multer({ storage: storage });

// reouter.post('/:id/upload', parser.array('images', 10), function (req, res) {
//   console.log(req.files);
// });

module.exports = router;
