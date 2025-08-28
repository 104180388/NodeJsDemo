const express = require('express')
const 
const morgan = require('morgan')
const app = express();

// app.use(morgan("dev"))
// morgan("compile")
// morgan("")

app.use(morgan("tiny"))
app.use(helmet)

app.get('/', (req, res, next) => {
    return res.status(500).json({
        message: 'Welcome Fantipjs!'
    })
})

module.exports = app