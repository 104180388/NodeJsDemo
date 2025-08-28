const express = require('express')
const { default: helmet } = require('helmet')
const morgan = require('morgan')
const app = express();

// app.use(morgan("dev"))
// morgan("compile")
// morgan("")

app.use(morgan("dev"))
app.use(helmet())


app.get('/', (req, res, next) => {
    const strCompress
    return res.status(500).json({
        message: 'Welcome Fantipjs!'
    })
})

module.exports = app