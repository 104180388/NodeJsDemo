'use strict'

const AccessService = require("../service/access.service")
const { OK, CREATED, SuccessResponse} = require('../core/success.respone')

class AccessController {
    static handlerRefeshToken = async (req,res,next) =>{
        
        new SuccessResponse({
            message: 'Get token success!',
            metadata: await AccessService.handlerRefreshToken(req.body.refreshToken)
        }).send(res)
    }

    static logout = async (req,res,next) =>{
        new SuccessResponse({
            message: 'Logout success!',
            metadata: await AccessService.logout(req.keyStore)
        }).send(res)
    }
    static login = async (req,res,next) =>{
        
        new SuccessResponse({
            metadata: await AccessService.login(req.body)
        }).send(res)
    }
    static signUp = async (req, res, next) => {
        
        new CREATED({
            message: 'Registered OK!',
            metadata: await AccessService.signUp(req.body),
            options: true
        }).send(res)
    }
}


module.exports = AccessController
