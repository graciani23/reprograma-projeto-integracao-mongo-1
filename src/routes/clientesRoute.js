const express = require('express')
const router = express.Router()
const controller = require('../controllers/clientesController')

router.post('/', controller.post)
router.get('/', controller.get)
router.get('/:_id/id', controller.getById)
router.get('/compradores', controller.getCompradores)
router.get('/:cpf', controller.getByCpf)
router.put('/:cpf/atualiza', controller.update)
router.put('/:_id/id', controller.updateById)
router.delete('/:_id/exclui', controller.delete)

//apidoc -i src/ -o public/apidoc
/**
* @api {get} /clientes
**
*@apiGroup Clientes


 */
module.exports = router

/**
 * @api {get} /clientes
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */