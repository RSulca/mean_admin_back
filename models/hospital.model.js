const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
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
    }
});
// },{ collection: 'Raaaaaaa' });

module.exports = model('Hospital', HospitalSchema);