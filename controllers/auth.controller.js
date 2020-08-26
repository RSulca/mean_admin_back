const { response, request } = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt.helper');


const login = async(req, res = response) => {
    const { email, password } = req.body;
    try {
        const data = await User.findOne({ email });
        if (!data) {
            res.status(401).json({
                ok: false,
                message: 'Incorrect credentials.'
            })
        }
        const validPassword = bcrypt.compareSync(password, data.password);
        if (!validPassword) {
            res.json({
                ok: false,
                message: 'Bye'
            });
        }
        const token = await generateJWT(data._id)
        res.json({
            ok: true,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error, please check logs.'
        })
    }
}

module.exports = {
    login
}