const { response, request } = require('express');
const Hospital = require('../models/hospital.model');
const { generateJWT } = require('../helpers/jwt.helper');

const getHospitals = async(req, res) => {
    const hospitals = await Hospital.find().populate('user', 'name email');
    res.json({
        ok: true,
        hospitals
    })
}

const createHospital = async(req = request, res = response) => {
    const hospital = new Hospital({
        user: req._id,
        ...req.body
    });
    try {
        await hospital.save();
        return res.json({
            ok: true,
            data: hospital
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Error, please check logs.'
        })
    }
}

const updateHospital = async(req = request, res) => {
    const id = req.params.id;
    const uid = req._id;
    const data = req.body;
    try {
        const hospital = await Hospital.findByIdAndUpdate(id, data, { new: true });
        if (!hospital) {
            return res.status(404).json({
                ok: false,
                message: 'This hospital does not exist.'
            })
        } else {
            return res.status(400).json({
                ok: true,
                hospital: hospital
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error, please check logs.'
        })
    }
}

const deleteHospital = async(req = request, res) => {
    const id = req.params.id;
    try {
        const find = await Hospital.findById(id);
        if (!find) {
            return res.status(404).json({
                ok: false,
                message: 'This hospital does not exist.'
            })
        } else {
            const hospital = await Hospital.findByIdAndDelete(id);
            return res.status(200).json({
                ok: true,
                message: 'Hospital has been deleted.'
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Error, please check logs.'
        })
    }
}

module.exports = { getHospitals, createHospital, updateHospital, deleteHospital };