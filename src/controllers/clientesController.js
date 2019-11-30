const Clientes = require('../models/clientes')
const Joi = require('joi')
const bcrypt = require('bcryptjs')
const bcryptSalt = 8 // qtde de vezes que o password será embaralhado

exports.post = async (req, res) => {
    const { nome, password, email, cpf, dataNascimento, estadoCivil, telefone, comprou } = req.body

    const salt = bcrypt.genSaltSync(bcryptSalt)
    try {
        const hashPass = await bcrypt.hashSync(password, salt)
        Clientes.push({ nome, hashPass, email, cpf, dataNascimento, estadoCivil, telefone, comprou })

        return res.status(201).send(Clientes)

    } catch (err) {
        return res.status(401).send({ error: 'error' + err })
    }
    // cliente.save(function (err) {
    //     if (err) res.status(500).send('Registration Failed: ' + err)
    //     else {
    //         res.status(201).send({
    //             "status": true,
    //             "mensagem": "Cliente incluído com sucesso!"
    //         })
    //     }
    // })

    cliente.save()
        .then(() => {
            res.status(201).send({
                "status": true,
                "mensagem": "Cliente incluído com sucesso!"
            })
        })
        .catch(err => res.status(500).send({ message: err }))
}


exports.get = (req, res) => {
    Clientes.find()
        .then((clientes) => {
            res.status(200).send(clientes)
        })
        .catch(err => res.status(500).send({ message: err }))
}


exports.getById = (req, res) => {
    const clienteId = req.params._id
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

exports.updateById = (req, res) => {

    Clientes.update(
        { _id: req.params._id },
        { $set: req.body },
        { upsert: true },
        function (err) {
            if (err) return res.status(500).send({ message: err })
            res.status(200).send({ message: 'Atualizado com sucesso!' })
        }
    )
}


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

//findByIdAndRemove

exports.delete = (req, res) => {
    const clienteId = req.params._id
    Clientes.findById(clienteId, function (err, cliente) {
        if (err) res.status(500).send(err)

        if (!cliente) {
            return res.status(200).send({ message: `Infelizmente não localizamos o cliente` })
        }

        cliente.remove(function (err) {
            if (!err) {
                res.status(200).send({ message: "Cliente removido com sucesso!" })
            }
        })
    })
}



const validaForumulario = (campos) => {

    const schema = {
        nome: Joi.string().min(1).required(),
        email: Joi.string().min(1).required(),
    }
    const validation = Joi.validate(campos, schema)

    if (validation.erro) {
        return false
    }
    return true
}