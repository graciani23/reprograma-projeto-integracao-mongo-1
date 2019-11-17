const express = require('express')
const router = express.Router()
const controller = require('../controllers/clientesController')

router.post('/clientes', controller.post)

module.exports = router