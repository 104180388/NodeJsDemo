const shopModel = require("../models/shop.model")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const KeyTokenService = require("./keyToken.service")
const {createTokenPair} = require("../auth/authUtils")
const { BadRequestError, ConflictRequestError } = require("../core/error.response")


const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITER: 'EDITOR',
    ADMIN: 'ADMIN'
}

class AccessService{

        static signUp = async ({name, email,password}) => {
            try{
                const holderShop = await shopModel.findOne({email}).lean()
                
                if(holderShop){
                    throw new BadRequestError('Error: Shop already register!')
                }

                const passwordHash = await bcrypt.hash(password, 10)
                
                const newShop = await shopModel.create({
                    name, email, password: passwordHash, roles: [RoleShop.SHOP]
                    
                })
                
                if(newShop){

                    const privateKey = crypto.randomBytes(64).toString('hex');
                    const publicKey = crypto.randomBytes(64).toString('hex');
                

                    // console.log({privateKey,publicKey}) //save collectionKeyStore

                    const keyStore = await KeyTokenService.createKeyToken({
                        userId: newShop._id,
                        publicKey,
                        privateKey
                    })
                    

                    if(!keyStore){
                        return {
                            code: 'xxxx',
                            message: 'keyStore error'
                        }
                    }
                    
                    // const publicKeyObject = crypto.createPublicKey(keyStore)
                    const tokens = await createTokenPair({userId: newShop._id, email}, publicKey, privateKey)
                    console.log(`Created Token Success::`, tokens)

                    return {
                        code:201,
                        metadata: {
                            shop: newShop,
                            tokens
                        }
                    }
                    //const tokens = await

                }

                return{
                    code:200,
                    metadata:null
                }

                
            } catch(error){
                return{
                    code: 'xxx',
                    message : error.message,
                    status: 'error'
                }
            }
        }
}

module.exports = AccessService