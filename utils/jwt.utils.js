const { sign, verify } = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET
const TOKEN_EXPIRY = process.env.TOKEN_EXPIRY


createToken = (user) => {
    try {
        let token = sign({
            ...user
        }, JWT_SECRET, TOKEN_EXPIRY &&  { expiresIn: TOKEN_EXPIRY })
        return token
    } catch (error) {
        return error
    }
}

decodeToken = (token) => {
    try {        
        let decodedToken = verify(token, JWT_SECRET)
        return decodedToken
    } catch (error) {
        return error
    }
}

module.exports = { createToken, decodeToken }