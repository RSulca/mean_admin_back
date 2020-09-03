/*
    Path: /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validationFields } = require('../middlewares/validation-fields.middleware');
const { login, loginGoogle, refreshToken } = require('../controllers/auth.controller');
const { validationJWT } = require('../middlewares/validation-jwt.middleware');
const router = Router();

router.post('/', [
    check('email', 'The email is necessary').isEmail(),
    check('password', 'The password is necessary').not().isEmpty(),
    validationFields
], login);

router.post('/google', [
    check('token', 'Token is necessary').not().isEmpty(),
    validationFields
], loginGoogle);

router.get('/', validationJWT, refreshToken);
module.exports = router;