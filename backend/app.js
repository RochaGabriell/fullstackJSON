import express from 'express'
import fs from 'fs'

const app = express()
app.use(express.json())

const arquivoJson = 'dados.json'
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

app.get('/estudantes', (req, res) => {
  res.status(200).json(dados)
})

export default app
