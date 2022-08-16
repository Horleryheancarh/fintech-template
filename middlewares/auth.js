const { decodeToken } = require('../utils/jwt.utils')


authenticateUser = async (req, res, next) => {
    try {
        if (!req.headers.authorization) return res.status(401).json({ message: 'Authorization required' })
        let authHeader = req.headers.authorization.split(' ')
        if (authHeader[0] !== 'Bearer') return res.status(401).json({ message: 'Authorization format not accepted'})
        let token = authHeader[1]
        req.user = decodeToken(token)
        
        next()
    } catch (error) {
        return res.status(300).json(error)
    }
}


module.exports = { authenticateUser }