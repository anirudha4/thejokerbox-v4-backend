// requires
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// init app
const app = express();

// middlewares
app.use(helmet())
app.use(cors({
    origin: 'http://127.0.0.1:5500' // client URL
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require routes
app.use('/api', require('./routes'));

module.exports = app;