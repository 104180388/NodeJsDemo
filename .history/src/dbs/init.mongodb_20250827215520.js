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
        mongoose.connect(connectString).then( _ => console.log('Connect Mongodb Success'))
        .catch(err=>console.log('error connect!'))
    }

    static getInstance(){
        if(!Database.instance){
            Database.in
        }
    }
}