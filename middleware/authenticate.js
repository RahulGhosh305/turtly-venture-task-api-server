const jwt = require('jsonwebtoken');

const AuthenticateToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, `${process.env.PRIVATE_JWT_KEY}`)

        req.user = decode
        next()
    }
    catch (error) {
        res.json("Authentication Failed")
    }
}
module.exports = AuthenticateToken