// app.js
const express = require('express');
const helmet = require('helmet');   // ← fix: require directly (no { default })
const morgan = require('morgan');

const app = express();
console.log(`Process`, process.env)

// Middlewares
app.use(morgan('dev'));
app.use(helmet());

require('./dbs/init.mongodb')

app.use()

const {checkOverload} = require('./helpers/check.connect')
checkOverload();

// Routes



// (optional) basic error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;
