import { createContext } from 'react'

export type TipoUsuario = 'CLIENTE' | 'FUNCIONARIO'

export interface User {
  id: number
  nome: string
  email: string
  tipoUsuario: TipoUsuario
  perfis: string[]
}

export interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  token: string | null
  login: (email: string, senha: string) => Promise<User>
  logout: () => void
  loading: boolean
  error: string | null
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
