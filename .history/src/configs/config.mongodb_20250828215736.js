'use strict'

//level 0

const dev = {
    app:{
        port: process.env.DEV_APP_PORT
    },
    db:{
        host: process.env.DEV_APP_PORT,
        port: process.env.DEV_APP_PORT,
        name: process.env.DEV_APP_PORT,
    }
}

const pro = {
    app:{
        port:3000
    },
    db:{
        host: 'localhost',
        port: 27017,
        name: 'dbProduct',
    }
}

const config = {dev, pro}
const env = process.env.NODE_ENV ||'dev'
module.exports = config[evn]