// app.js
const express = require('express');
const helmet = require('helmet');   // ← fix: require directly (no { default })
const morgan = require('morgan');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(helmet());

require('./dbs/init.mongodb')

const {checkOverload} = require('./helpers/check.connect')
checkOverload();

// Routes
app.get('/', (req, res) => {
  const strCompress = 'Hello Factipjs';
  return res.status(200).json({
    message: 'Welcome Fantipjs!',
    metadata: strCompress.repeat(1000) // was 10000; reduce to avoid huge payloads
  });
});


// (optional) basic error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;
