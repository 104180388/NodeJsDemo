const express = require('express')
const morgan = require('morgan')
const app = express();

// app.use(morgan("dev"))
// morgan("compile")
// morgan("")

app.use(morgan())

module.exports = app