const { response, request } = require('express');
const Doctor = require('../models/doctor.model');
const Hospital = require('../models/hospital.model');

const getDoctor = async(req, res) => {
    try {
        const id = req.params.id;
        const doctor = await Doctor.findById(id).populate('user', 'name email').populate('hospital', 'name');
        if (!doctor) {
            return res.status(404).json({
                ok: false,
                message: 'Doctor does not exist'
            })
        }
        return res.json({
            ok: true,
            doctor
        })
    } catch (error) {
        return res.json({
            ok: false,
            message: 'Error, please check logs.'
        })
    }
}

const getDoctors = async(req, res) => {
    const doctor = await Doctor.find().populate('user', 'name email').populate('hospital', 'name');
    res.json({
        ok: true,
        doctor
        // _id: req._id
    })
}

const createDoctor = async(req = request, res = response) => {
    const doctor = new Doctor({
        user: req._id,
        ...req.body
    });
    try {
        await doctor.save();
        return res.json({
            ok: true,
            data: doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error, please check logs.'
        })
    }
}

const updateDoctor = async(req = request, res) => {
    const id = req.params.id;
    const { hospital, ...data } = req.body;
    try {
        const find = await Doctor.findById(id);
        if (!find) {
            return res.status(404).json({
                ok: false,
                message: 'This doctor does not exist.'
            })
        } else {
            const hospital_find = Hospital.findById(hospital);
            if (!hospital_find) {
                return res.status(404).json({
                    ok: false,
                    message: 'This hospital does not exist.'
                })
            }
            const doctor = await Doctor.findByIdAndUpdate(id, req.body, { new: true });
            return res.status(200).json({
                ok: true,
                user: doctor
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

const deleteDoctor = async(req = request, res) => {
    const id = req.params.id;
    try {
        const find = await Doctor.findById(id);
        if (!find) {
            return res.status(404).json({
                ok: false,
                message: 'This doctor does not exist.'
            })
        } else {
            const doctor = await Doctor.findByIdAndDelete(id);
            return res.status(200).json({
                ok: true,
                doctor,
                message: 'Doctor has been deleted.'
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

module.exports = { getDoctors, createDoctor, updateDoctor, deleteDoctor, getDoctor };