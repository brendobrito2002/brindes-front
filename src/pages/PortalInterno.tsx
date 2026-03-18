import { Box, Button, Container, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { AppBreadcrumbs } from '../components/AppBreadcrumbs'
import { APP_MODULES } from '../config/modules'
import { useAuth } from '../context/useAuth'

export const PortalInterno = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  const isAdmin = user?.perfis?.some(perfil => 
    perfil === 'ROLE_ADMIN' || perfil === 'ADMIN'
  ) ?? false

  return (
    <Box py={10}>
      <Container maxW="6xl">
        <AppBreadcrumbs />
        <VStack align="start" gap={2} mt={4} mb={8}>
          <Heading size="lg" color="gray.900">
            Portal Interno
          </Heading>
          <Text color="gray.600">
            Selecione um módulo para continuar no ambiente interno de gerenciamento.
          </Text>
        </VStack>
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={5}>
          {APP_MODULES.map((module) => {
            if (module.key === 'admin' && !isAdmin) {
              return null
            }

            return (
              <Box
                key={module.key}
                bg="white"
                border="1px solid"
                borderColor="gray.200"
                borderRadius="lg"
                p={6}
                boxShadow="sm"
              >
                <VStack align="start" gap={4}>
                  <Box
                    w="44px"
                    h="44px"
                    borderRadius="md"
                    bg="gray.100"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="gray.700"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="3" width="7" height="7" rx="1.5" />
                      <rect x="14" y="3" width="7" height="7" rx="1.5" />
                      <rect x="3" y="14" width="7" height="7" rx="1.5" />
                      <rect x="14" y="14" width="7" height="7" rx="1.5" />
                    </svg>
                  </Box>
                  <VStack align="start" gap={1}>
                    <Text fontSize="lg" fontWeight="700" color="gray.900">
                      {module.label}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      Acessar o módulo de {module.label.toLowerCase()}.
                    </Text>
                  </VStack>
                  <Button
                    bg="gray.900"
                    color="white"
                    size="sm"
                    borderRadius="md"
                    _hover={{ bg: 'gray.800' }}
                    onClick={() => navigate(module.path)}
                  >
                    Abrir módulo
                  </Button>
                </VStack>
              </Box>
            )
          })}
        </SimpleGrid>
      </Container>
    </Box>
  )
}