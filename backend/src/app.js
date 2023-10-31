const express = require('express')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

const app = express()

app.use(express.json())

const arquivoJson = 'src/db/dados.json'
let dados = []

if (fs.existsSync(arquivoJson)) {
  const dadosRaw = fs.readFileSync(arquivoJson)
  dados = JSON.parse(dadosRaw)
} else {
  fs.writeFileSync(arquivoJson, '[]')
}

app.get('/', (req, res) => {
  res.status(200).send('Notas de Aula - IFPI')
})

app.post('/estudantes', (req, res) => {
  const novoEstudante = {
    id: uuidv4(),
    nome: req.body.nome,
    dataNascimento: req.body.dataNascimento
  }

  dados.push(novoEstudante)
  fs.writeFileSync(arquivoJson, JSON.stringify(dados))
  res.status(201).json(novoEstudante)
})

module.exports = app
