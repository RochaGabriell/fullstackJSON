import { useState, useEffect } from 'react'
import axios from 'axios'

import {
  Container,
  CustomButton,
  Title,
  Error,
  WrapperTable,
  Table,
  Input
} from './styles'

const News = () => {
  const apiURL = 'http://localhost:8080'
  const [news, setNews] = useState([])
  const [newsSelected, setNewsSelected] = useState(null)
  const [newNews, setNewNews] = useState({
    news_title: '',
    news_content: '',
    news_image: '',
    news_date: ''
  })
  const [erro, setErro] = useState(null)
  const dateForm = newNews.news_date.split('-').reverse().join('-')

  const addNews = async () => {
    try {
      const newNewsFormatado = {
        news_title: newNews.news_title,
        news_content: newNews.news_content,
        news_image: newNews.news_image,
        news_date: dateForm
      }

      if (newsSelected) {
        await axios.put(
          `${apiURL}/news/${newsSelected.id}`,

          newNewsFormatado
        )
      } else {
        await axios.post(`${apiURL}/news`, newNewsFormatado)
      }
      setNewsSelected(null)
      setNewNews({
        news_title: '',
        news_content: '',
        news_image: '',
        news_date: ''
      })
      SearchRecords()
      setErro('')
    } catch (error) {
      setErro(`Erro ao adicionar: ${error.message}`)
    }
  }

  const cancelUpdate = () => {
    setNewsSelected(null)
    setNewNews({
      news_title: '',
      news_content: '',
      news_image: '',
      news_date: ''
    })
  }

  const editStudent = item => {
    setNewsSelected(item)

    setNewNews({
      news_title: item.news_title,
      news_content: item.news_content,
      news_image: item.news_image,
      news_date: dateForm
    })
  }

  const SearchRecords = async () => {
    try {
      const response = await axios.get(`${apiURL}/news`)
      setNews(response.data)
      setErro('')
    } catch (error) {
      setErro('Erro ao buscar: ' + error.message)
    }
  }

  const RemoveNews = async id => {
    try {
      await axios.delete(`${apiURL}/news/${id}`)
      SearchRecords()
      setErro('')
    } catch (error) {
      setErro(`Erro ao remover: ${error.message}`)
    }
  }

  useEffect(() => {
    SearchRecords()
  }, [])

  return (
    <Container>
      <Title>Gerenciador de Notícias</Title>

      {erro && <Error>{erro}</Error>}

      <WrapperTable>
        <Table>
          <tbody>
            {news.map(item => (
              <tr key={item.id}>
                <td>{item.news_title}</td>
                <td>{item.news_content}</td>
                <td>{item.news_date}</td>
                <td>
                  <CustomButton onClick={() => editStudent(item)}>
                    Editar
                  </CustomButton>
                  <CustomButton onClick={() => RemoveNews(item.id)}>
                    Remover
                  </CustomButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </WrapperTable>

      <Title>Adicionar/Atualizar</Title>

      <div>
        <label>Título: </label>
        <Input
          type="text"
          value={newNews.news_title}
          onChange={e => setNewNews({ ...newNews, news_title: e.target.value })}
        />
        <label>Data: </label>
        <Input
          type="date"
          value={newNews.news_date}
          onChange={e =>
            setNewNews({
              ...newNews,
              news_date: e.target.value
            })
          }
        />
        <label>Conteúdo: </label>
        <Input
          type="text"
          value={newNews.news_content}
          onChange={e =>
            setNewNews({
              ...newNews,
              news_content: e.target.value
            })
          }
        />
        <label>Imagem: </label>
        <Input
          type="text"
          value={newNews.news_image}
          onChange={e =>
            setNewNews({
              ...newNews,
              news_image: e.target.value
            })
          }
        />
        <CustomButton onClick={addNews}>
          {newsSelected ? 'Atualizar' : 'Adicionar'}
        </CustomButton>
        <CustomButton onClick={cancelUpdate}>Cancelar</CustomButton>
      </div>
    </Container>
  )
}

export default News
