const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')
const clientes = require('../models/clientes')
const bcrypt = require('bcryptjs')

function checkPassword(passwordEntry, password) {
    console.log(passwordEntry, 'aqui é o password do usuário')
    console.log(password, 'aqui é o password do BD')
    return bcrypt.compareSync(passwordEntry, password)
}

exports.getToken = (req, res) => {
    const { name, password: passwordEntry } = req.body
    const user = clientes.find(item => item.nome == nome)

    if (!user) {
        return res.status(401).send({ error: 'client not found' })
    }

    // deconstrução se o user for encontrado
    const { id, nome, hasPass } = user

    try {
        checkPassword(passwordEntry, hasPass)
    } catch (err) {
        return res.status(401).send({ error: 'password does not match!' })
    }

    try {
        return res.json({
            user: {
                id,
                nome,
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn
            }),
        })
    } catch (err) {
        return res.status(401).send({ error: 'error' })
    }
}

