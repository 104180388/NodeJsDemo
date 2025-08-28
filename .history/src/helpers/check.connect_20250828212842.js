'use strict'
const os = require('os')
const mongoose = require('mongoose')

const countConnect = () => {
    const numConnection = mongoose.connections.length
    console.log(`Number of connections: ${numConnection}`);
}

const _SECONDS = 2000;

const checkOverload = () => {
    setInterval( () => {
        const numConnection = mongoose.connection.length
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;
        const maxConnections = numCores * 5;

        console.log(`Memory usage:: ${memomyUsage/1024/1024} MB`)

        if(numConnection > maxConnections){
            console.log(`connection overload detected!`)
        }
    }, _SECONDS)
}

module.exports = {
    countConnect, checkOverload
}