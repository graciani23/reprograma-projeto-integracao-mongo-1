const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')
const { promissify } = require('util')

// vai receptar nossas requisições
module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).send({ error: 'Token not privided' })
    }

    const [, token] = authHeader.split(' ')

    try {
        const decoded = await promissify(jwt.verify)(token, authConfig.secret)
        req.userId = decoded.id
        return next()
    } catch (err) {
        return res.status(401).send({ error: 'Token invalid' })
    }
}