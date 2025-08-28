'use strict'

class AccessController{
    signUp = async (req, res, next) => {
        try{
            console.log(`[P]::signUp::`, req.body)
            return res.status(200).json({
                code: 200,
                metadata: req.body
            });
        }catch(error){
            next(error)
        }
}
}

module.exports = new AccessController();