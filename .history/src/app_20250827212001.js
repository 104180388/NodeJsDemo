const express = require('express')
const morgan = require('morgan')
const app = express();

// app.use(morgan("dev"))
// morgan("compile")
// morgan("")

app.use(morgan("tiny"))
app.use(helmet)

app.get('/'. (req, this.resource, next)=>{
    return res.status(500)
})

module.exports = app