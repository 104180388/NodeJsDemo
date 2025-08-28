'use strict'

const mongoose = require('mongoose')

const countConnect = () => {
    const numConnection = mongoose.connections.length
    console.log(`Number of connections: ${numConnection}`);
}

const checkOverload = () => {
    setInterval( () =>{
        const numConnection = mongoose.connection.length
        const numCores = 
    }, _SECONDS)
}

module.exports = countConnect