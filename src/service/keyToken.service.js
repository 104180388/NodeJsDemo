
const keytokenModel = require("../models/keytoken.model")
class KeyTokenService{
    static createKeyToken = async({userId, publicKey}) => {
        try{
            const publicKeyString = publicKey.toString()
            const tokens = await keytokenMo
        } catch(error){
            return error
        }
    }
}

module.exports = KeyTokenService