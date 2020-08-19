require('dotenv').config(); // Use .env

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

const app = express();
// app.use( cors() );

dbConnection();

app.get('/', (req, res) => {
    res.json({
        message: 'Hello'
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server run in port ${process.env.PORT}`);
})