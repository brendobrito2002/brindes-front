import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Container,
  HStack,
  Input,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import logo from '../assets/logo.svg'
import loginFrame from '../assets/login_frame.png'
import { authService } from '../services/authService'

export const Register = () => {
  const navigate = useNavigate()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [documento, setDocumento] = useState('')
  const [telefone, setTelefone] = useState('')
  const [endereco, setEndereco] = useState('')
  const [segmentacao, setSegmentacao] = useState('')
  const [token, setToken] = useState('')
  const [tokenSent, setTokenSent] = useState(false)
  const [tokenSuccessMessage, setTokenSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSendToken = async () => {
    setError('')
    setTokenSuccessMessage('')

    if (!email) {
      setError('Informe seu email para receber o token de cadastro')
      return
    }

    setIsLoading(true)

    try {
      await authService.requestRegisterToken({ email })
      setTokenSent(true)
      setTokenSuccessMessage('Token enviado com sucesso. Confira seu email para concluir o cadastro.')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao enviar token de cadastro'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setTokenSuccessMessage('')

    if (senha !== confirmarSenha) {
      setError('As senhas não conferem')
      return
    }

    if (!token) {
      setError('Informe o token enviado para o seu email')
      return
    }

    setIsLoading(true)

    try {
      await authService.register({
        nome,
        email,
        senha,
        token,
        documento: documento || undefined,
        telefone: telefone || undefined,
        endereco: endereco || undefined,
        segmentacao: segmentacao || undefined,
      })

      navigate('/login', {
        replace: true,
        state: {
          registerSuccess: true,
          registeredEmail: email,
        },
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao cadastrar cliente'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box display="flex" minH="100vh">
      <Box
        display={{ base: 'none', md: 'flex' }}
        w={{ base: 'full', md: '50%' }}
        bg="white"
        justifyContent="center"
        alignItems="center"
        p={{ base: 4, sm: 6, md: 8 }}
      >
        <img
          src={logo}
          alt="Bahia Brindes Logo"
          style={{
            width: 'clamp(16rem, 10vw, 8rem)',
            height: 'clamp(16rem, 10vw, 8rem)',
          }}
        />
      </Box>

      <Box
        w={{ base: 'full', md: '50%' }}
        backgroundImage={`url(${loginFrame})`}
        backgroundPosition="center"
        backgroundSize="cover"
        backgroundAttachment="fixed"
        minH="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius={{ base: 0, md: '3xl 0 0 3xl' }}
        p={4}
      >
        <Container maxW="2xl" w="full">
          <VStack
            as="form"
            onSubmit={handleSubmit}
            gap={4}
            bg="white"
            p={{ base: 6, md: 8 }}
            borderRadius="lg"
            boxShadow="12px 16px 4px 0px rgba(0, 0, 0, 0.15)"
            maxW="760px"
            mx="auto"
          >
            <Box display={{ base: 'flex', md: 'none' }} w="full" textAlign="center" justifyContent="center">
              <img
                src={logo}
                alt="Bahia Brindes Logo"
                style={{
                  width: '12rem',
                  height: '12rem',
                }}
              />
            </Box>

            <Text fontSize="2xl" fontWeight="700" color="slate.900" textAlign="center">
              Cadastre-se
            </Text>

            {error && (
              <Box
                bg="red.50"
                border="1px solid"
                borderColor="red.200"
                p={3}
                borderRadius="md"
                w="full"
              >
                <Text color="red.800" fontSize="sm">
                  {error}
                </Text>
              </Box>
            )}

            {tokenSuccessMessage && (
              <Box
                bg="green.50"
                border="1px solid"
                borderColor="green.200"
                p={3}
                borderRadius="md"
                w="full"
              >
                <Text color="green.800" fontSize="sm">
                  {tokenSuccessMessage}
                </Text>
              </Box>
            )}

            <VStack w="full" align="start" gap={2}>
              <Text as="label" fontSize="sm" fontWeight="medium">
                Nome
              </Text>
              <Input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Seu nome" disabled={isLoading} />
            </VStack>

            <VStack w="full" align="start" gap={2}>
              <Text as="label" fontSize="sm" fontWeight="medium">
                Email
              </Text>
              <HStack w="full" align="start" gap={3} flexDir={{ base: 'column', md: 'row' }}>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setToken('')
                    setTokenSent(false)
                    setTokenSuccessMessage('')
                  }}
                  placeholder="seu@email.com"
                  disabled={isLoading}
                />
                <Button
                  minW={{ base: 'full', md: '180px' }}
                  onClick={handleSendToken}
                  type="button"
                  variant="outline"
                  borderColor="slate.900"
                  color="slate.900"
                  disabled={isLoading || !email}
                >
                  {tokenSent ? 'Reenviar token' : 'Enviar token'}
                </Button>
              </HStack>
            </VStack>

            <VStack w="full" align="start" gap={2}>
              <Text as="label" fontSize="sm" fontWeight="medium">
                Token de confirmação
              </Text>
              <Input
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Cole o token enviado por email"
                disabled={isLoading}
              />
            </VStack>

            <HStack w="full" align="start" gap={3} flexDir={{ base: 'column', sm: 'row' }}>
              <VStack flex={1} align="start" gap={2}>
                <Text as="label" fontSize="sm" fontWeight="medium">
                  Senha
                </Text>
                <Input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Sua senha"
                  disabled={isLoading}
                />
              </VStack>
              <VStack flex={1} align="start" gap={2}>
                <Text as="label" fontSize="sm" fontWeight="medium">
                  Confirmar senha
                </Text>
                <Input
                  type="password"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  placeholder="Repita a senha"
                  disabled={isLoading}
                />
              </VStack>
            </HStack>

            <HStack w="full" align="start" gap={3} flexDir={{ base: 'column', sm: 'row' }}>
              <VStack flex={1} align="start" gap={2}>
                <Text as="label" fontSize="sm" fontWeight="medium">
                  CPF
                </Text>
                <Input
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value.replace(/\D/g, ''))}
                  placeholder="Somente números"
                  maxLength={11}
                  disabled={isLoading}
                />
              </VStack>
              <VStack flex={1} align="start" gap={2}>
                <Text as="label" fontSize="sm" fontWeight="medium">
                  Telefone
                </Text>
                <Input
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value.replace(/\D/g, ''))}
                  placeholder="Somente números"
                  maxLength={11}
                  disabled={isLoading}
                />
              </VStack>
            </HStack>

            <VStack w="full" align="start" gap={2}>
              <Text as="label" fontSize="sm" fontWeight="medium">
                Segmentação
              </Text>
              <Input
                value={segmentacao}
                onChange={(e) => setSegmentacao(e.target.value)}
                placeholder="Ex.: Varejo"
                disabled={isLoading}
              />
            </VStack>

            <VStack w="full" align="start" gap={2}>
              <Text as="label" fontSize="sm" fontWeight="medium">
                Endereço
              </Text>
              <Textarea
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                placeholder="Seu endereço"
                resize="vertical"
                disabled={isLoading}
              />
            </VStack>

            <Button
              w="full"
              type="submit"
              loading={isLoading}
              disabled={isLoading || !nome || !email || !senha || !confirmarSenha || !token}
              loadingText="Cadastrando..."
              bg="linear-gradient(135deg, #000000ff 0%, #2d3561 100%)"
              color="white"
              fontSize="sm"
              fontWeight="600"
              letterSpacing="0.5px"
              py={3}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 20px rgba(26, 31, 58, 0.3)',
              }}
            >
              CRIAR CONTA
            </Button>

            <Button
              variant="ghost"
              size="sm"
              color="slate.900"
              fontSize="xs"
              onClick={() => navigate('/login')}
              _hover={{ textDecoration: 'underline' }}
            >
              Já tem conta? Entrar
            </Button>
          </VStack>
        </Container>
      </Box>
    </Box>
  )
}
