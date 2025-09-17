const JWT = require('jsonwebtoken')
const asyncHandler = require('../helpers/asyncHandler')
const { findByUserId } = require('../service/keyToken.service')
const { NotFoundError, AuthFailureError } = require('../core/error.response')

//service


const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: `authorization`,
}

const createTokenPair = async (payload, publicKey, privateKey) => {
    try{
        // accessToken
        const accessToken = await JWT.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '2 days'
        })

        const refreshToken = await JWT.sign(payload, privateKey,{
            algorithm: 'RS256',
            expiresIn: '2 days'
        })


        JWT.verify(accessToken, publicKey, (err, decode)=>{
            if(err){
                console.error(`error verify::`, err)
            }
            else{
                console.log(`decode verify::`, decode)
            }
        })
        return {accessToken, refreshToken}
    } catch(error){

    }
}

const authentication = asyncHandler( async(req, res, next)=>{
    //1.checkuserId missing
    //2.get access Token
    //3.verify token
    //4.check user in db
    //5.check keystore with userid
    //6.ok all => return next()

    const userId = req.headers[HEADER.CLIENT_ID]
    if(!userId) throw new AuthFailureError('Invalid request 1')

    const keyStore = await findByUserId(userId)
    if(!keyStore) throw new NotFoundError('Not found keyStore')
    
    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if(!accessToken) throw new AuthFailureError('Invalid Request 2')

    try{
        console.log(accessToken)
        console.log(keyStore.publicKey)
        const decodeUser = JWT.verify(accessToken, keyStore.publicKey)
        console.log(decodeUser)
        if(userId!==decodeUser.userId) throw new AuthFailureError('Invalid UserId')
        req.keyStore = keyStore
        console.log(10)
        return next()      
    }
    catch(error){
        throw error
    }
})

const verifyJWT = async(token,keySecret)=>{
    return await JWT.verify(token, keySecret)
}
module.exports = {
    createTokenPair, authentication, verifyJWT
}