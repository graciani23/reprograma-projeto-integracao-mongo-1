const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).send({
        title: "API - Clientes >> Projeto Livre",
        author: "Graciani Sousa",
        version: "0.0.1"
    })
})

module.exports = router