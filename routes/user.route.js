/*
    Path: /api/user
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validationFields } = require('../middlewares/validation-fields.middleware');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/user.controller');
const { validationJWT, validationAdminRole, validationAdminRoleSameId } = require('../middlewares/validation-jwt.middleware');
const router = Router();

router.get('/', validationJWT, getUsers);
router.post('/', [
    check('name', 'The name is necessary.').not().isEmpty(),
    check('email', 'The email is necessary').isEmail(),
    check('password', 'The password is necessary').not().isEmpty(),
    validationFields
], createUser);
router.put('/:id', [validationJWT, validationAdminRoleSameId], updateUser);
router.delete('/:id', [validationJWT, validationAdminRole], deleteUser);

module.exports = router;