import { Box, Button, Container, Flex, Heading, Input, Spacer } from '@chakra-ui/react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'

export default function Home() {
  const BACKEND_URL = 'http://localhost:8000/api'
  const toast = useToast()

  const [containers, setContainers] = useState([])
  const [id, setId] = useState(null)
  const [client, setClient] = useState('')
  const [number, setNumber] = useState('')
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  const [category, setCategory] = useState('')

  const clearImput = () => {
    setId(null)
    setClient('')
    setNumber('')
    setType('')
    setStatus('')
    setCategory('')
  }

  const loadContainers = async () => {
    const response = await axios.get(`${BACKEND_URL}/container`)
    setContainers(response.data.containers)
    console.log(containers)
  }

  useEffect(() => {
    loadContainers()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()

    const data = { client, number, type, status, category }

    try {

      if (id) {
        const response = await axios.put(`${BACKEND_URL}/container/${id}`, data)
        console.log(response)
        toast({
          title: `${response.data.message}`,
          status: 'success',
          isClosable: true,
        })
      } else {
        const response = await axios.post(`${BACKEND_URL}/container`, data)
        console.log(response)
        toast({
          title: `${response.data.message}`,
          status: 'success',
          isClosable: true,
        })
      }

      clearImput()
      loadContainers()
    } catch (error) {
      console.log(error)
      toast({
        title: `${error.response.data.message}`,
        status: 'error',
        isClosable: true,
      })
    }
  }

  const handleEdit = async id => {
    try {
      const response = await axios.get(`${BACKEND_URL}/container/${id}/edit`)
      console.log(response)
      setId(response.data.container.id)
      setClient(response.data.container.client)
      setNumber(response.data.container.number)
      setType(response.data.container.type)
      setStatus(response.data.container.status)
      setCategory(response.data.container.category)

    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async id => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/container/${id}`)
      console.log(response)
      loadContainers()
      toast({
        title: `${response.data.message}`,
        status: 'success',
        isClosable: true,
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div >
      <Container onSubmit={handleSubmit}>
        <Box p='2'>
          <Heading size='md'>Cadastro de Containers</Heading>
        </Box>
        <Spacer />
        <FormControl>
          <FormLabel htmlFor='email'>Cliente</FormLabel>
          <Input id='email' type='text' value={client} onChange={e => setClient(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='email'>Número</FormLabel>
          <Input id='email' type='text' value={number} onChange={e => setNumber(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor='email'>Tipo</FormLabel>
          <Input id='email' type='text' value={type} onChange={e => setType(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor='email'>Status</FormLabel>
          <Input id='email' type='text' value={status} onChange={e => setStatus(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor='email'>Categoria</FormLabel>
          <Input id='email' type='text' value={category} onChange={e => setCategory(e.target.value)} />
        </FormControl>

        <Button colorScheme='blue' marginTop={3} marginBottom={5} size={'sm'}
          onClick={handleSubmit}>
          Salvar
        </Button>
      </Container>

      <Container>
        <Box p='2'>
          <Heading size='md'>Lista de Containers</Heading>
        </Box>
        <Spacer />
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Cliente</Th>
              <Th>Número</Th>
              <Th>Tipo</Th>
              <Th>Status</Th>
              <Th>Categoria</Th>
              <Th>Acões</Th>
            </Tr>
          </Thead>
          <Tbody>
            {containers.map(ctn => (
              <Tr key={ctn.id}>
                <Td>{ctn.client}</Td>
                <Td>{ctn.number}</Td>
                <Td>{ctn.type}</Td>
                <Td>{ctn.status}</Td>
                <Td>{ctn.category}</Td>
                <Td>
                  <Flex>
                    <Button colorScheme='yellow' marginTop={3} marginBottom={5}
                      size={'sm'}
                      onClick={() => handleEdit(ctn.id)}>
                      Editar
                    </Button>
                    <Button colorScheme='red' marginTop={3} marginBottom={5}
                      size={'sm'}
                      marginLeft={3}
                      onClick={() => handleDelete(ctn.id)}>
                      Excluir
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Box>

        </Box>
      </Container>


    </div>
  )
}
