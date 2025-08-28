'use strict'

const mongoose = require('mongoose')

const connectString = ''

class Database {
    constructor(){
        this.connect()
    }

    connect(type='mongodb'){
        if(1===1){
            mongoose.set('debug', true)
            mongoose.set('debug', {color: true})

        }
        mongoose.connect(connectString)
    }
}