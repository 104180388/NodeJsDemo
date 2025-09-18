'use strict'

const ProductService = require("../service/product.service")
const {SuccessResponse} = require('../core/success.respone')

class ProductController {
    createProduct = async (req,res,next) =>{
        new SuccessResponse({
            message: 'Create new Product success!',
            metadata: await ProductService.createProduct(req.body.product_type, {
                ...req.body,
                product_shop: req.user.userId
            })
        }).send(res)
    }

}

module.exports = new ProductController()
