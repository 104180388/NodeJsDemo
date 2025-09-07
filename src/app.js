// app.js
require('dotenv').config();
const compression = require('compression');
const express = require('express');
const helmet = require('helmet');   // ← fix: require directly (no { default })
const morgan = require('morgan');

const app = express();
// console.log(`Process`, process.env)

// Middlewares
app.use(morgan('dev'));
app.use(helmet());
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

require('./dbs/init.mongodb')

// // Routes
app.use('', require('./routes'));

// const {checkOverload} = require('./helpers/check.connect')
// checkOverload();



// error handler

app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    const statusCode = error.status || 500
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message || 'Internal Server Error'
    })
})


module.exports = app;
