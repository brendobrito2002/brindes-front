import { Box, Button, Container, Text, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export const MeuPerfil = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <Box py={10} minH="100vh" bg="gray.50">
      <Container maxW="3xl">
        <VStack
          align="stretch"
          gap={4}
          bg="white"
          borderRadius="lg"
          border="1px solid"
          borderColor="gray.200"
          p={{ base: 5, md: 8 }}
          boxShadow="sm"
        >
          <Text fontSize="2xl" fontWeight="700" color="gray.900">
            Meu perfil
          </Text>

          <Box>
            <Text fontSize="sm" color="gray.500">
              Nome
            </Text>
            <Text fontSize="md" fontWeight="600" color="gray.900">
              {user?.nome ?? '-'}
            </Text>
          </Box>

          <Box>
            <Text fontSize="sm" color="gray.500">
              Email
            </Text>
            <Text fontSize="md" color="gray.900">
              {user?.email ?? '-'}
            </Text>
          </Box>

          <Box>
            <Text fontSize="sm" color="gray.500">
              Tipo de usuário
            </Text>
            <Text fontSize="md" color="gray.900">
              {user?.tipoUsuario === 'FUNCIONARIO' ? 'Funcionário' : user?.tipoUsuario === 'CLIENTE' ? 'Cliente' : '-'}
            </Text>
          </Box>

          <Button
            alignSelf="flex-start"
            variant="ghost"
            onClick={() => navigate(user?.tipoUsuario === 'FUNCIONARIO' ? '/portal-interno' : '/')}
          >
            Voltar
          </Button>
        </VStack>
      </Container>
    </Box>
  )
}
