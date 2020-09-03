const { response, request } = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt.helper');
const { verify } = require('../helpers/verify-google.helper');



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

const loginGoogle = async(req, res) => {
    try {
        const { name, email, picture } = await verify(req.body.token);
        const user = await User.findOne({ email });
        let new_user;
        if (!user) {
            new_user = new User({
                name,
                email,
                password: '@adw32423.fsef',
                img: picture,
                google: true
            });
        } else {
            new_user = user;
            new_user.google = true;
        }
        const data = await new_user.save();

        const token = await generateJWT(data._id)


        return res.status(200).json({
            ok: true,
            token
        })



    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            message: "Token invalid."
        })
    }

}

module.exports = {
    login,
    loginGoogle
}