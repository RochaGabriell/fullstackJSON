import { Outlet, Link } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import './App.css'

const Container = styled.div`
  background-color: black;
  padding: 10px;
  height: 100vh;
  color: white;
`

const ContainerBtn = styled.div`
  display: flex;
  justify-content: space-between;
`

const Btn = styled(Link)`
  background-color: black;
  color: black;
  padding: 10px;
  text-decoration: none;
  border-radius: 5px;

  &:hover {
    background-color: white;
  }
`

const App = () => {
  return (
    <Container>
      <ContainerBtn>
        <Btn to={'/'}>Home</Btn>
        <Btn to={'/news'}>Nova Postagem</Btn>
      </ContainerBtn>
      <Outlet />
    </Container>
  )
}

App.propTypes = {
  children: PropTypes.node.isRequired
}

export default App
