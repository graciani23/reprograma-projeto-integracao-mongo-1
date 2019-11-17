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