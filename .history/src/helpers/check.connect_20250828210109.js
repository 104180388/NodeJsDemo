'use strict'

const mongoose = require('mongoose')

const countConnect = () => {
    const numConnection = mongoose.connections.length
    console.log(`Number of connections: ${numConnection}`);
}

const checkOverload = () => {
    setInterval( () =>{
        const numConnection = 
    }, _SECONDS)
}

module.exports = countConnect