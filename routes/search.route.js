/*
    Path: /api/all
*/

const { Router } = require('express');
const { getData, getDataCollection } = require('../controllers/search.controller');
const { validationJWT } = require('../middlewares/validation-jwt.middleware');
const router = Router();

router.get('/:argument', validationJWT, getData);
router.get('/collection/:table/:argument', validationJWT, getDataCollection);

module.exports = router;