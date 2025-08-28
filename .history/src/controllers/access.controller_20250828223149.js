'use strict'

class AccessController{
    try {
        console.log("Access Controller")
    } catch (error) {
        next(error);
    }
}

module.exports = new AccessController();