const mongoose = require('mongoose')

const ClientesSchema = new mongoose.Schema({
    nome: { type: String },
    email: { type: String },
    estadoCivil: { type: String }
})

const Clientes = mongoose.model('Clientes', ClientesSchema)

module.exports = Clientes