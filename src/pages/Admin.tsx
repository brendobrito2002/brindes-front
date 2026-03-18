import { useState } from 'react'
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react'
import { AppBreadcrumbs } from '../components/AppBreadcrumbs'
import { useAuth } from '../context/useAuth'

export const Admin = () => {
  const { token } = useAuth()

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [perfis, setPerfis] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' | 'warning' } | null>(null)

  const showFeedback = (message: string, type: 'success' | 'error' | 'warning') => {
    setFeedback({ message, type })
    setTimeout(() => setFeedback(null), 5000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!nome.trim() || !email.trim() || !senha.trim()) {
      showFeedback('Preencha nome, email e senha', 'warning')
      return
    }

    setIsLoading(true)
    setFeedback(null)

    try {
      const response = await fetch('http://localhost:8080/api/funcionarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome: nome.trim(),
          email: email.trim(),
          senha: senha.trim(),
          perfis: perfis.length > 0 ? perfis : ['ROLE_FUNCIONARIO'],
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Erro ao cadastrar funcionário')
      }

      showFeedback('Funcionário cadastrado com sucesso!', 'success')

      setNome('')
      setEmail('')
      setSenha('')
      setPerfis([])

    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido'
      showFeedback(message || 'Tente novamente mais tarde', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box py={10}>
      <Container maxW="6xl">
        <AppBreadcrumbs />
        <Heading size="lg" color="gray.900" mb={6}>
          Admin - Cadastro de Funcionário
        </Heading>

        {feedback && (
          <Box
            mb={6}
            p={4}
            bg={
              feedback.type === 'success' ? 'green.100' :
              feedback.type === 'error' ? 'red.100' :
              'yellow.100'
            }
            color={
              feedback.type === 'success' ? 'green.800' :
              feedback.type === 'error' ? 'red.800' :
              'yellow.800'
            }
            borderRadius="md"
            borderWidth="1px"
          >
            {feedback.message}
          </Box>
        )}

        <Box bg="white" p={8} borderRadius="lg" boxShadow="md" maxW="md">
          <form onSubmit={handleSubmit}>
            <VStack gap={5}>
              <Box w="full">
                <Text mb={2} fontWeight="medium">Nome *</Text>
                <Input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Nome completo"
                />
              </Box>

              <Box w="full">
                <Text mb={2} fontWeight="medium">Email *</Text>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@exemplo.com"
                />
              </Box>

              <Box w="full">
                <Text mb={2} fontWeight="medium">Senha *</Text>
                <Input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Senha inicial"
                />
              </Box>

              <Box w="full">
                <Text mb={2} fontWeight="medium">Perfis (opcional)</Text>
                <select
                  value={perfis}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    const selected = Array.from(e.target.selectedOptions).map(
                      (option) => (option as HTMLOptionElement).value
                    )
                    setPerfis(selected)
                  }}
                  multiple
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    minHeight: '80px'
                  }}
                >
                  <option value="ROLE_FUNCIONARIO">Funcionário</option>
                  <option value="ROLE_ADMIN">Administrador</option>
                </select>
                <Text fontSize="xs" color="gray.500" mt={1}>
                  Se nenhum perfil for selecionado, será atribuído ROLE_FUNCIONARIO automaticamente.
                </Text>
              </Box>

              <Button
                type="submit"
                colorScheme="blue"
                width="full"
                loading={isLoading}
                loadingText="Cadastrando..."
              >
                Cadastrar Funcionário
              </Button>
            </VStack>
          </form>
        </Box>

        <Text mt={8} color="gray.600">
          Funcionalidade de cadastro de novos funcionários (acesso exclusivo ADMIN).
        </Text>
      </Container>
    </Box>
  )
}