import '@coreui/coreui/dist/css/coreui.min.css'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {
  CCarousel,
  CCarouselItem,
  CCarouselCaption,
  CImage
} from '@coreui/react'

const Container = styled.div`
  display: flex;
  justify-content: center;

  img {
    height: calc(90vh - 10px);
  }
`

const Home = () => {
  const apiURL = 'http://localhost:8080'
  const [news, setNews] = useState([])
  const [erro, setErro] = useState(null)

  const buscarRegistros = async () => {
    try {
      const response = await axios.get(`${apiURL}/news`)
      setNews(response.data)
      setErro('')
    } catch (error) {
      setErro('Erro ao buscar: ' + error.message)
    }
  }

  useEffect(() => {
    buscarRegistros()
  }, [])

  return (
    <Container>
      {erro && <p>{erro}</p>}
      <CCarousel controls indicators>
        {news.map((value, index) => (
          <CCarouselItem key={index}>
            <CImage src={value.news_image} alt={value.news_title} />
            <CCarouselCaption className="d-none d-md-block">
              <h5>
                {value.news_title} - {value.news_date}
              </h5>
              <p>{value.news_title}</p>
            </CCarouselCaption>
          </CCarouselItem>
        ))}
      </CCarousel>
    </Container>
  )
}

export default Home
