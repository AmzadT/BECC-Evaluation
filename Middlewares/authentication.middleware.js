require('dotenv').config()
const jwt = require('jsonwebtoken')

const Authenticate = (req, res, next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({ message: 'Token is not provided' })
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        if (!decoded) {
            return res.status(403).json({ message: 'Token is not valid' })
        }
        req.user = decoded
        next()
    } catch (error) {
        console.error(error)
        res.status(401).json({ message: 'Authentication failed' })
    }
}

module.exports = Authenticate;