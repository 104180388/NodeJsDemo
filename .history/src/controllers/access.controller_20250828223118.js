'use strict'

class AccessController{
    signUp = async (req, res, next) => {
        return res.status(200).json({
            message: 'AccessController signUp',
        });
}
}

module.exports = new AccessController();