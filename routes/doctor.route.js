/*
    Path: /api/doctor
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validationFields } = require('../middlewares/validation-fields.middleware');
const { validationJWT } = require('../middlewares/validation-jwt.middleware');
const { getDoctors, createDoctor, updateDoctor, deleteDoctor, getDoctor } = require('../controllers/doctor.controller');
const router = Router();

router.get('/', validationJWT, getDoctors);
router.get('/:id', validationJWT, getDoctor);
router.post('/', [
    validationJWT,
    check('name', 'Name is necessary').not().isEmpty(),
    check('hospital', 'Hospital not found ass').isMongoId(),
    validationFields
], createDoctor);
router.put('/:id', validationJWT, updateDoctor);
router.delete('/:id', validationJWT, deleteDoctor);

module.exports = router;