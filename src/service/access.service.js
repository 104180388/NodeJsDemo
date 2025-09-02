const shopModel = require("../models/shop.model")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const KeyTokenService = require("./keyToken.service")

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
                    return{
                        code: 'xxxx',
                        message: 'Shop already registered!',
                    }
                }

                const passwordHash = await bcrypt.hash(password, 10)
                
                const newShop = await shopModel.create({
                    name, email, password: passwordHash, roles: [RoleShop.SHOP]
                    
                })
                
                console.log("helo")
                if(newShop){
                    //created privateKey, publicKey
                    const{privateKey,publicKey} = crypto.generateKeyPairSync('rsa',{
                        modulusLength:4096
                    })

                    console.log({privateKey,publicKey}) //save collectionKeyStore

                    const publicKeyString = await KeyTokenService.createKeyToken({
                        userId: newShop._id,
                        publicKey
                    })

                    if(!publicKeyString){
                        return {
                            code: 'xxxx',
                            message: 'publicKeyString error'
                        }
                    }
                    
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
                    statuc: 'error'
                }
            }
        }
}

module.exports = AccessService