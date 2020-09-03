/*
    Path: /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validationFields } = require('../middlewares/validation-fields.middleware');
const { login, loginGoogle } = require('../controllers/auth.controller');
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

module.exports = router;