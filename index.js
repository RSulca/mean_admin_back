require('dotenv').config(); // Use .env

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

const app = express();
app.use(cors());
app.use(express.json());
dbConnection();

app.use(express.static('public'));

app.use('/api/user', require('./routes/user.route'));
app.use('/api/hospital', require('./routes/hospital.route'));
app.use('/api/doctor', require('./routes/doctor.route'));
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/search', require('./routes/search.route'));
app.use('/api/upload', require('./routes/upload.route'));


app.listen(process.env.PORT, () => {
    console.log(`Server run in port ${process.env.PORT}`);
})