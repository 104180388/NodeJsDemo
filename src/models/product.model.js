const {model, Schema} = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = "Apikey"
const COLLECTION_NAME = "Apikeys"

const productSchema = new Schema({
    product_name: {type: String, required: true},

})

const clothingSchema = new Schema({
    brand: {type:String, require: true},
    size: String,
    material:String
},{
    collection:'electronics',
    timestamps:true
})

module.exports ={
    product: model(DOCUMENT_NAME, productSchema),
    electronic: model('Elec')
}