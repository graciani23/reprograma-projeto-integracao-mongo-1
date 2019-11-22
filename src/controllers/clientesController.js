const Clientes = require('../models/clientes')
const Joi = require('joi')

exports.post = (req, res) => {
    const cliente = new Clientes(req.body)

    cliente.save(function (err) {
        if (err) res.status(500).send('Registration Failed: ' + err)
        else {
            res.status(201).send({
                "status": true,
                "mensagem": "Aluna incluída com sucesso!"
            })
        }
    })
}

exports.get = (req, res) => {
    Clientes.find(function (err, clientes) {
        if (err) res.status(500).send(err);
        res.status(200).send(clientes);
    })
}


exports.getById = (req, res) => {
    const clienteId = req.params.id
    Clientes.find({ _id: clienteId }, function (err, cliente) {
        if (err) res.status(500).send(err)

        res.status(200).send(cliente)
    })
}

exports.getCompradores = (req, res) => {
    Clientes.find({ "comprou": true }, function (err, clientes) {
        if (err) res.status(500).send(err)

        const clientesRetorno = clientes.map(item => {
            return {
                nome: item.nome,
                email: item.email
            }
        })
        res.status(200).send(clientesRetorno)
    })
}


exports.getByCpf = (req, res) => {
    const clienteCpf = req.params.cpf
    Clientes.find({ cpf: clienteCpf }, function (err, cliente) {
        if (err) res.status(500).send(err)

        res.status(200).send(cliente)
    })
}

// exports.update = (req, res) => {

//     Clientes.update(
//         { _id: req.params.id },
//         { $set: req.body },
//         { upsert: true },
//         function (err) {
//             if (err) return res.status(500).send({ message: err })
//             res.status(200).send({ message: 'Atualizado com sucesso!' })
//         }
//     )
// }

exports.update = (req, res) => {

    if (!validaForumulario(req.body)) return res.status(400).send('Campo inválido!')

    Clientes.update(
        { cpf: req.params.cpf },
        { $set: req.body },
        { upsert: true },
        function (err) {
            if (err) return res.status(500).send({ message: err })
            res.status(200).send({ message: 'Atualizado com sucesso!' })
        }
    )
}


exports.delete = (req, res) => {
    const clienteId = req.params._id
    Clientes.findByIdAndRemove(clienteId, function (err, cliente) {
        if (err) res.status(500).send(err)

        if (!cliente) {
            return res.status(200).send({ message: `Infelizmente não localizamos o cliente` })
        }

        aluna.remove(function (err) {
            if (!err) {
                res.status(204).send({ message: "Aluna removida com sucesso!" })
            }
        })
        res.status(200).send("Cliente removido!")
    })
}

const validaForumulario = (campos) => {

    const schema = {
        nome: Joi.string().min(1).required(),
        email: Joi.string().min(1).required(),
    }
    const validation = Joi.validate(campos, schema)

    if (validation.error) {
        return false
    }
    return true
}