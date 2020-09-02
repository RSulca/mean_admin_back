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
    // const id = req.params.id;
    // const { password, google, ...data } = req.body;
    // try {
    //     const find = await User.findById(id);
    //     if (!find) {
    //         return res.status(404).json({
    //             ok: false,
    //             message: 'This user does not exist.'
    //         })
    //     } else {
    //         const same = await User.findOne({ email: data.email });
    //         if (same) {
    //             return res.status(404).json({
    //                 ok: false,
    //                 message: 'This email is already exists.'
    //             })
    //         }
    //         console.log(data);
    //         const new_user = await User.findByIdAndUpdate(id, data, { new: true });
    //         let data_user = {...new_user._doc };
    //         delete data_user.password;
    //         return res.status(400).json({
    //             ok: true,
    //             user: data_user
    //         })
    //     }
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({
    //         ok: false,
    //         message: 'Error, please check logs.'
    //     })
    // }
}

const deleteHospital = async(req = request, res) => {
    // const id = req.params.id;
    // try {
    //     const find = await User.findById(id);
    //     if (!find) {
    //         return res.status(404).json({
    //             ok: false,
    //             message: 'This user does not exist.'
    //         })
    //     } else {
    //         const new_user = await User.findByIdAndDelete(id);
    //         return res.status(400).json({
    //             ok: true,
    //             user: new_user,
    //             message: 'User has been deleted.'
    //         })
    //     }
    // } catch (error) {
    //     console.log(error);
    //     return res.status(500).json({
    //         ok: false,
    //         message: 'Error, please check logs.'
    //     })
    // }
}

module.exports = { getHospitals, createHospital, updateHospital, deleteHospital };