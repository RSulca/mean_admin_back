/*
    Path: /api/upload
*/

const { Router } = require('express');
const { setImage, getImage } = require('../controllers/upload.controller');
const { validationJWT } = require('../middlewares/validation-jwt.middleware');
const fileUpload = require('express-fileupload');
const router = Router();

router.use(fileUpload());

router.put('/:table/:id', validationJWT, setImage);
router.get('/:table/:photo', validationJWT, getImage);


module.exports = router;