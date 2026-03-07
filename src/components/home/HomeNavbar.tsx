import { useRef, useState } from 'react'
import { Box, Button, Container, HStack, Text, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import { useOutsideDismiss } from '../useOutsideDismiss'
import { HOME_NAV_LINKS } from './homeData'

export const HomeNavbar = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement | null>(null)

  useOutsideDismiss(userMenuRef, () => setIsUserMenuOpen(false), isUserMenuOpen)

  const handleLogout = () => {
    logout()
    setIsUserMenuOpen(false)
    navigate('/')
  }

  return (
    <Box
      as="nav"
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.100"
      position="sticky"
      top={0}
      zIndex={100}
    >
      <Container maxW="7xl">
        <HStack justify="space-between" py={3}>
          <HStack gap={10}>
            <Text
              fontFamily="'Dancing Script', 'Brush Script MT', cursive"
              fontSize="2xl"
              fontWeight="700"
              color="#1a1616"
              letterSpacing="tight"
              whiteSpace="nowrap"
            >
              Bahia&nbsp;Brindes
            </Text>

            <HStack gap={7} display={{ base: 'none', md: 'flex' }}>
              {HOME_NAV_LINKS.map((item) => (
                <Text
                  key={item}
                  fontSize="sm"
                  fontWeight="500"
                  color="gray.700"
                  cursor="pointer"
                  _hover={{ color: '#1a1616' }}
                >
                  {item}
                </Text>
              ))}
            </HStack>
          </HStack>

          <HStack gap={4}>
            {user?.nome ? (
              <Text
                fontSize="sm"
                fontWeight="500"
                color="gray.700"
                display={{ base: 'none', md: 'block' }}
              >
                Olá, {user.nome}
              </Text>
            ) : null}
            <Box as="button" color="gray.600" _hover={{ color: '#1a1616' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </Box>
            <Box position="relative" ref={userMenuRef}>
              <Box
                as="button"
                color="gray.600"
                _hover={{ color: '#1a1616' }}
                onClick={() => setIsUserMenuOpen((value) => !value)}
                aria-label="Abrir menu do usuário"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Box>

              {isUserMenuOpen ? (
                <Box
                  position="absolute"
                  top="calc(100% + 10px)"
                  right={0}
                  bg="white"
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="md"
                  boxShadow="lg"
                  minW="180px"
                  zIndex={110}
                  overflow="hidden"
                >
                  <VStack align="stretch" gap={0} py={2}>
                    {!user ? (
                      <Button
                        variant="ghost"
                        justifyContent="flex-start"
                        borderRadius="0"
                        h="36px"
                        px={4}
                        fontSize="sm"
                        fontWeight="400"
                        onClick={() => {
                          setIsUserMenuOpen(false)
                          navigate('/login')
                        }}
                      >
                        Login
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          justifyContent="flex-start"
                          borderRadius="0"
                          h="36px"
                          px={4}
                          fontSize="sm"
                          fontWeight="400"
                          onClick={() => {
                            setIsUserMenuOpen(false)
                            navigate('/meu-perfil')
                          }}
                        >
                          Meu perfil
                        </Button>
                        <Button
                          variant="ghost"
                          justifyContent="flex-start"
                          borderRadius="0"
                          h="36px"
                          px={4}
                          fontSize="sm"
                          fontWeight="400"
                          onClick={handleLogout}
                        >
                          Logout
                        </Button>
                      </>
                    )}
                  </VStack>
                </Box>
              ) : null}
            </Box>
            <Box as="button" position="relative" color="gray.600" _hover={{ color: '#1a1616' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <Box
                position="absolute"
                top="-6px"
                right="-6px"
                bg="#1a1616"
                color="white"
                borderRadius="full"
                w="16px"
                h="16px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="9px"
                fontWeight="700"
              >
                1
              </Box>
            </Box>
          </HStack>
        </HStack>
      </Container>
    </Box>
  )
}
