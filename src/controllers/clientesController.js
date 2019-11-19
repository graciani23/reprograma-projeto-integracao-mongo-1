const Clientes = require('../models/clientes')

// exports.post = (req, res) => {
//     try {
//         const clientes = Clientes.create(req.body);
//         return res.send({ clientes });
//     } catch (err) {
//         return res.status(400).send({ error: 'Registration failed: '+err })
//     }
// }

exports.post = (req, res) => {
    const cliente = new Clientes(req.body)

    cliente.save(function(err) {
        if (err) res.status(500).send('Registration Failed: '+err)

        res.status(200).send(cliente)
    })
}

exports.get = (req, res) => {
    Clientes.find(function(err, clientes) {
        if (err) res.status(500).send(err);
        res.status(200).send(clientes);
    })
}

exports.getCompradores = (req, res) => {
    Clientes.find({"comprou": true}, function(err, clientes) {
        if (err) res.status(500).send(err)
        res.status(200).send(clientes)
    })
}

exports.getByCpf = (req, res) => {
    const clienteCpf = req.params.cpf
    Clientes.findById(clienteCpf, function(err, cliente) {
        if (err) res.status(500).send(err)

        if(!cliente) {
            return res.status(200).send({ message: `Infelizmente não localizamos o cliente de id ${clienteCpf}`})
        }
        res.status(200).send(clienteCpf)
    })
}

exports.delete = (req, res) => {
    const clienteId = req.params._id
    Clientes.findByIdAndRemove(clienteId, function(err, cliente) {
        if (err) res.status(500).send(err)
        res.status(200).send("Cliente removido!")
    })
}