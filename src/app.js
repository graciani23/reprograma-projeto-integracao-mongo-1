const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/clientes', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB conectado!')
}).catch((err) => {
    console.log('Houve um erro ao se conectar ao mongoDB: '+err)
})

// rotas
const index = require('./routes/index')
const clientes = require('./routes/clientesRoute')

app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
  })

app.use('/', index)
app.use('/clientes', clientes)

module.exports = app