'use strict'

class AccessController{
    signUp = async (req, res, next) => {
        try{
            console.log(`[P]::signUp::`, req.body)
            return res.status(200).json({
                message: 'signUp success',
                metadata: req.body
            });
        }catch(error){
            next(err)
        }
}
}

module.exports = new AccessController();