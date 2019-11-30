const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const mongoose = require('mongoose')
//mongodb+srv://admin:admin123@reprograma-xazlh.mongodb.net/clientes
//mongodb+srv://gracianisousa:admin123@cluster0-ce6zl.mongodb.net/clientes
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
const sessions = require('./routes/sessionRoutes')

app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*") // permite que pessoas acessem a api
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
  })

app.use('/', index)
app.use('/clientes', clientes)
app.use('/sessions', sessions)

module.exports = app