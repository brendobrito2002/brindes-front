const RAW_API_BASE_URL = import.meta.env.VITE_API_BASE_URL

if (!RAW_API_BASE_URL) {
  throw new Error('A variável VITE_API_BASE_URL deve ser definida no arquivo .env')
}

export const API_BASE_URL = RAW_API_BASE_URL.replace(/\/$/, '')

export const apiUrl = (path: string) => `${API_BASE_URL}${path}`

export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    forgotPassword: '/api/auth/forgot-password',
    resetPassword: '/api/auth/reset-password',
  },
  estoque: {
    resumo: '/api/estoque/resumo',
    itens: '/api/estoque/itens',
    movimentacoes: '/api/estoque/movimentacoes',
    materiasPrimas: '/api/estoque/materias-primas',
    fornecedores: '/api/estoque/fornecedores',
    locais: '/api/estoque/locais',
    categorias: '/api/estoque/categorias',
    unidades: '/api/estoque/unidades',
  },
  produtos: '/api/produtos',
}

