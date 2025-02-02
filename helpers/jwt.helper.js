const jwt = require('jsonwebtoken');

const generateJWT = (_id) => {
    return new Promise((resolve, reject) => {
        const payload = {
            _id
        }
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '2h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT.')
            } else {
                resolve(token)
            }
        })
    })
}

module.exports = {
    generateJWT
}