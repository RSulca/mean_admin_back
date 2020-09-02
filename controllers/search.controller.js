const { response, request } = require('express');

const User = require('../models/user.model');
const Doctor = require('../models/doctor.model');
const Hospital = require('../models/hospital.model');


const getData = async(req, res = response) => {
    const argumento = req.params.argument;
    const regexp = new RegExp(argumento, 'i');
    const [users, doctors, hospitals] = await Promise.all([
        User.find({ name: regexp }),
        Doctor.find({ name: regexp }),
        Hospital.find({ name: regexp })
    ])
    try {
        return res.status(200).json({
            ok: true,
            results: {
                users,
                doctors,
                hospitals
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error, please check logs.'
        })
    }
}

const getDataCollection = async(req, res = response) => {
    const table = req.params.table;
    const argument = req.params.argument;
    const regexp = new RegExp(argument, 'i');

    try {
        switch (table) {
            case 'user':
                const users = await User.find({ name: regexp });
                return res.status(200).json({
                    ok: true,
                    users
                })
                break;
            case 'hospital':
                const hospitals = await Hospital.find({ name: regexp }).populate('user', 'name email');
                return res.status(200).json({
                    ok: true,
                    hospitals
                })
                break;
            case 'doctor':
                const doctors = await Doctor.find({ name: regexp }).populate('user', 'name email').populate('hospital', 'name');
                return res.status(200).json({
                    ok: true,
                    doctors
                })
                break;
            default:
                return res.status(404).json({
                    ok: false,
                    message: 'Table not found.'
                })
                break;
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error, please check logs.'
        })
    }
}

module.exports = {
    getData,
    getDataCollection
}