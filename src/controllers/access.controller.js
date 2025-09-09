'use strict'

const AccessService = require("../service/access.service")
const { OK, CREATED, SuccessResponse} = require('../core/success.respone')

class AccessController {
    login = async (req,res,next) =>{
        new SuccessResponse({
            metadata: await AccessService.login(req.body)
        }).send(res)
    }
    signUp = async (req, res, next) => {
        new CREATED({
            message: 'Registered OK!',
            metadata: await AccessService.signUp(req.body),
            options: true
        }).send(res)
    }
}

module.exports = new AccessController()
