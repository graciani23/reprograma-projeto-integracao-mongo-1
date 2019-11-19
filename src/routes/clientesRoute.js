const express = require('express')
const router = express.Router()
const controller = require('../controllers/clientesController')

router.post('/', controller.post)
router.get('/', controller.get)
router.get('/compradores', controller.getCompradores)
router.get('/:cpf', controller.getByCpf)
router.delete('/:_id/exclui', controller.delete)

module.exports = router