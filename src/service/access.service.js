const shopModel = require("../models/shop.model")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const KeyTokenService = require("./keyToken.service")
const {createTokenPair} = require("../auth/authUtils")
const { BadRequestError, ConflictRequestError, AuthFailureError } = require("../core/error.response")
const { findByEmail } = require("./shop.service")
const { getInfoData } = require("../utils")


const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITER: 'EDITOR',
    ADMIN: 'ADMIN'
}

class AccessService{
        //1.check email 2.password 3. create access token va rt save trong db 4. general token 5. get data return login
        
        static login =async({email, password, refreshToken =null}) =>{

            //1
            const foundShop = await findByEmail({email})
            if(!foundShop) throw new BadRequestError('Shop not registed!')
            //2
            const match = bcrypt.compare(password, foundShop.password)
            if(!match) throw new AuthFailureError('Authen error')
            //3
            const { generateKeyPairSync } = require('crypto');
                    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
                        modulusLength: 2048, 
                        publicKeyEncoding: {
                            type: 'spki',
                            format: 'pem'
                        },
                        privateKeyEncoding: {
                            type: 'pkcs8',
                            format: 'pem'
                        }
                    });
            //4
            const { _id: userId} = foundShop
            const tokens = await createTokenPair({userId, email}, publicKey, privateKey)

            await KeyTokenService.createKeyToken({
                refreshToken: tokens.refreshToken,
                privateKey, publicKey, userId

            })
            
            return {
                shop: { _id: foundShop._id, name: foundShop.name },
                tokens
            }

        }

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

                    const { generateKeyPairSync } = require('crypto');
                    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
                        modulusLength: 2048, 
                        publicKeyEncoding: {
                            type: 'spki',
                            format: 'pem'
                        },
                        privateKeyEncoding: {
                            type: 'pkcs8',
                            format: 'pem'
                        }
                    });

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
                        code: 201,
                        metadata: {
                            shop: newShop,
                            tokens
                        }
                    }
                    //const tokens = await

                }

                return{
                    code: 200,
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