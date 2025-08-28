'use strict'

class AccessController{
    try {
        signUp = async (req, res, next) => {
            return res.status(200).json({
                message: 'AccessController signUp',
            });
    }
    } catch (error) {
        
    }
}

module.exports = new AccessController();