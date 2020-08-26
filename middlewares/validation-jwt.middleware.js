const jwt = require('jsonwebtoken');

const validationJWT = (req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            message: 'No token'
        })
    }

    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET)
        req._id = _id;
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            message: 'Invalid token'
        })
    }
}

module.exports = {
    validationJWT
}