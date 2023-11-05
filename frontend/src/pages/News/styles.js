import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const CustomButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  margin-right: 10px;
  &:hover {
    background-color: #0056b3;
  }
`

const Title = styled.h1`
  color: #333;
  font-size: 24px;
  margin: 10px 0;
`

const Error = styled.p`
  color: red;
`

const WrapperTable = styled.div`
  height: 200px;
  overflow-y: scroll;
`

const Table = styled.table`
  margin-top: 20px;

  th,
  td {
    max-width: 500px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }
`

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin: 5px 0;
  outline: none;
`

export {
  Container,
  CustomButton,
  Title,
  Error,
  WrapperTable,
  Table,
  Input
}