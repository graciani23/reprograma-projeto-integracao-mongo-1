const express = require('express')
const router = express.Router()
const controller = require('../controllers/clientesController')

router.post('/', controller.post)
router.get('/', controller.get)
router.get('/:id/id', controller.getById)
router.get('/compradores', controller.getCompradores)
router.get('/:cpf', controller.getByCpf)
router.put('/:_id/atualiza', controller.update)
router.delete('/:_id/exclui', controller.delete)

module.exports = router