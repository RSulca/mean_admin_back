const path = require('path');
const fs = require('fs');
const { response, request } = require('express');
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require('../helpers/update-image.helper');

const setImage = async(req, res = response) => {
    const table = req.params.table;
    const id = req.params.id;
    const tables_valids = ['user', 'hospital', 'doctor'];
    try {
        if (!tables_valids.includes(table)) {
            return res.status(400).json({
                ok: false,
                message: 'Any table found'
            })
        }
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                ok: false,
                message: 'No files were uploaded.'
            });
        }
        const sample_file = req.files.photo;
        const clean_name = sample_file.name.split('.');
        const extension = clean_name[clean_name.length - 1];
        const extensions_valids = ['jpg', 'png', 'jpeg', 'gif'];
        if (!extensions_valids.includes(extension)) {
            return res.status(400).json({
                ok: false,
                message: 'Extension no valid.'
            })
        }

        const unique_name = `${uuidv4()}.${extension}`;
        const path = `./uploads/${table}/${unique_name}`;

        sample_file.mv(path, (err) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            if (!updateImage(table, id, path, unique_name)) {
                return res.status(400).json({
                    ok: true,
                    message: 'Id invalid'
                })
            }
            return res.status(200).json({
                ok: true,
                message: 'File updated.',
                data: unique_name
            })
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error, please check logs.'
        })
    }
}

const getImage = async(req, res) => {
    const table = req.params.table;
    const photo = req.params.photo;
    const pathImg = path.join(__dirname, `../uploads/${table}/${photo}`);
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        res.sendFile(path.join(__dirname, `../uploads/no-found/no-img.jpg`));
    }

}

module.exports = {
    setImage,
    getImage
}