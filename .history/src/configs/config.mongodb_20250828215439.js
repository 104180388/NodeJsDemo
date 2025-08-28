'use strict'

//level 0

const dev = {
    app:{
        port: 3000
    },
    db:{
        host: 'localhost',
        port: 27017,
        name: 'dbDev',
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