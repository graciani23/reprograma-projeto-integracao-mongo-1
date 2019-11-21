const Clientes = require('../models/clientes')

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
    Clientes.find({ cpf: clienteCpf }, function(err, cliente) {
        if (err) res.status(500).send(err)

        res.status(200).send(cliente)
    })
}

exports.update = (req, res) => {
    Clientes.update(
        { _id: req.params.id },
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
        res.status(200).send("Cliente removido!")
    })
}