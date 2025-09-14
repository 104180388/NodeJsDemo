const apikeyModel = require("../models/apikey.model")

const findById = async (key) =>{
    // const newKey = await apikeyModel.create({key:'123456789', permission:['0000']})
    const objKey = await apikeyModel.findOne({key, status:true}).lean()
    return objKey
}

module.exports = findById