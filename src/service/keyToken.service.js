
const keytokenModel = require("../models/keytoken.model")

class KeyTokenService{
    static createKeyToken = async({userId, publicKey, privateKey}) => {
        try{
            // const publicKeyString = publicKey.toString()
            const tokens = await keytokenModel.create
        } catch(error){
            return error
        }
    }
}

module.exports = KeyTokenService