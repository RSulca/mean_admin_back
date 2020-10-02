const User = require('../models/user.model');
const Doctor = require('../models/doctor.model');
const Hospital = require('../models/hospital.model');

const fs = require('fs');
const { remove } = require('../models/user.model');

const removePhoto = (path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path)
    }
}

const updateImage = async(table, id, path, unique_name) => {
    switch (table) {
        case 'user':
            const user = await User.findById(id);
            if (!user) {
                return false;
            }
            removePhoto(unique_name);
            user.img = unique_name;
            await user.save();
            return true;
            break;
        case 'hospital':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                return false;
            }
            removePhoto(unique_name);
            hospital.img = unique_name;
            await hospital.save();
            return true;
            break;
        case 'doctor':
            const doctor = await Doctor.findById(id);
            if (!doctor) {
                return false;
            }
            removePhoto(unique_name);
            doctor.img = unique_name;
            await doctor.save();
            return true;
            break;
        default:
            return false;
            break;
    }
}

module.exports = {
    updateImage
}