/*
    Path: /api/hospital
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validationFields } = require('../middlewares/validation-fields.middleware');
const { validationJWT } = require('../middlewares/validation-jwt.middleware');
const { getHospitals, createHospital, updateHospital, deleteHospital } = require('../controllers/hospital.controller');
const router = Router();

router.get('/', validationJWT, getHospitals);
router.post('/', [
    validationJWT,
    check('name', 'Name is necessary').not().isEmpty(),
    validationFields
], createHospital);
router.put('/:id', validationJWT, updateHospital);
router.delete('/:id', validationJWT, deleteHospital);

module.exports = router;