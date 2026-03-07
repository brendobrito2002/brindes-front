import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { Box, Spinner, VStack } from '@chakra-ui/react'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowCliente?: boolean
}

export const ProtectedRoute = ({ children, allowCliente = false }: ProtectedRouteProps) => {
  const { isAuthenticated, loading, user } = useAuth()

  if (loading) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <VStack gap={4}>
          <Spinner
            borderWidth="4px"
            animationDuration="0.65s"
            colorPalette="gray"
            size="xl"
          />
        </VStack>
      </Box>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!allowCliente && user?.tipoUsuario === 'CLIENTE') {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
