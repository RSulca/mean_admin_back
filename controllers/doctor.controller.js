const { response, request } = require('express');
const Doctor = require('../models/doctor.model');

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
    // try {
    //     const current_email = await User.findOne({ email: user.email });
    //     if (current_email) {
    //         return res.status(400).json({
    //             ok: false,
    //             message: 'This email is already exists. '
    //         })
    //     }

    //     //Encrypt password
    //     const salt = bcrypt.genSaltSync();
    //     user.password = bcrypt.hashSync(user.password, salt);

    //     await user.save();
    //     const token = await generateJWT(user._id);
    //     const userShow = {
    //         ...user
    //     }
    //     let user_send = {...user._doc }
    //     delete user_send.password;
    //     res.json({
    //         ok: true,
    //         user: user_send,
    //         token
    //     })
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({
    //         ok: false,
    //         message: 'Error, please check logs.'
    //     })
    // }
}

const updateDoctor = async(req = request, res) => {
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

const deleteDoctor = async(req = request, res) => {
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

module.exports = { getDoctors, createDoctor, updateDoctor, deleteDoctor };