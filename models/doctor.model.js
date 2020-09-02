const { Schema, model } = require('mongoose');

const DoctorSchema = Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    hospital: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    }
});

module.exports = model('Doctor', DoctorSchema);