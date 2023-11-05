const express = require('express')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors({ origin: ['http://localhost:5173'] }))

const arquivoJson = 'src/db/dados.json'
let dados = []

if (fs.existsSync(arquivoJson)) {
  const dadosRaw = fs.readFileSync(arquivoJson)
  dados = JSON.parse(dadosRaw)
} else {
  fs.writeFileSync(arquivoJson, '[]')
}

app.get('/news', (req, res) => {
  res.json(dados)
})

app.get('/news/carousel', (req, res) => {
  const news = dados.slice(0, 3)
  res.json(news)
})

app.post('/news', (req, res) => {
  const { news_title, news_content, news_image, news_date } = req.body
  const id = uuidv4()
  const news = { id, news_title, news_content, news_image, news_date }
  dados.push(news)
  fs.writeFileSync(arquivoJson, JSON.stringify(dados))
  res.json(news)
})

app.put('/news/:id', (req, res) => {
  const { id } = req.params
  const { news_title, news_content, news_image, news_date } = req.body
  const index = dados.findIndex(news => news.id === id)
  if (index === -1) {
    return res.status(404).json({ error: 'Noticias não encontradas' })
  }
  const news = { id, news_title, news_content, news_image, news_date }
  dados[index] = news
  fs.writeFileSync(arquivoJson, JSON.stringify(dados))
  res.json(news)
})

app.delete('/news/:id', (req, res) => {
  const { id } = req.params
  const index = dados.findIndex(news => news.id === id)
  if (index === -1) {
    return res.status(404).json({ error: 'Noticias não encontradas' })
  }
  dados.splice(index, 1)
  fs.writeFileSync(arquivoJson, JSON.stringify(dados))
  res.sendStatus(204)
})

module.exports = app
