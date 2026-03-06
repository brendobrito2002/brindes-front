import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Home } from './pages/Home'
import { ProdutoDetalhe } from './pages/ProdutoDetalhe'
import { Login } from './pages/Login'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'

import { Produtos } from './pages/Produtos'
import { PortalInterno } from './pages/PortalInterno'

import { AppLayout } from './pages/AppLayout'
import { Admin } from './pages/Admin'
import { Estoque } from './pages/Estoque'
import { Compras } from './pages/Compras'
import { VendasClientes } from './pages/VendasClientes'
import { GestaoArquivos } from './pages/GestaoArquivos'
import { Perfil } from './pages/Perfil'
import { Configuracoes } from './pages/Configuracoes'
import { EstoqueParametrizacoes } from './pages/EstoqueParametrizacoes'


export const AppRoutes = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/produto/:id" element={<ProdutoDetalhe />} />
          <Route path="/login" element={<Login />} />

          {/* Rotas protegidas */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="portal-interno" element={<PortalInterno />} />
            <Route path="admin" element={<Admin />} />
            <Route path="estoque" element={<Estoque />} />
            <Route path="estoque/parametrizacoes" element={<EstoqueParametrizacoes />} />
            <Route path="compras" element={<Compras />} />
            <Route path="vendas-clientes" element={<VendasClientes />} />
            <Route path="gestao-arquivos" element={<GestaoArquivos />} />
            <Route path="perfil" element={<Perfil />} />
            <Route path="configuracoes" element={<Configuracoes />} />
            <Route path="produtos" element={<Produtos />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}
