const app = require('./src/app')
const port = 3000

app.listen(port, (err) => {
    if (err) {
        console.log(`Houve um erro ao se conectar: `+err)
    }
    console.log(`Servidor rodando na porta ${port}`)
})