const JWT = require('jsonwebtoken')

const createTokenPair = async (payload, PublicKeyCredential, privateKey) => {
    try{
        // accessToken
        const accessToken = await JWT.sign(payload, privateKey, {
            algorith: 'RS256',
        })

        const refreshToken = await JWT.sign(payload,privateKey,{
            algorith: 'RS256',
        })


        JWT.verify(accessToken, PublicKeyCredential, (err, decode)=>{
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

module.exports = {
    createTokenPair
}