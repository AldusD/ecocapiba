/* eslint-disable react/prop-types */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from './context/UserContext';
import { useUser } from './context/UserContext';

import HomePage from './components/pages/HomePage';
import AboutUsPage from './components/pages/AboutUsPage';
import NotFoundPage from './components/pages/NotFoundPage';
import EmployeePage from './components/pages/EmployeePage';
import LoginPage from './components/pages/LoginPage/LoginPage';
import EmployeeLoginPage from './components/pages/EmployeeLoginPage';
import ProfilePage from './components/pages/ProfilePage';
import InvitePage from './components/pages/InvitePage/InvitePage';
import UserDataLoader from './components/UserDataLoader';

const queryClient = new QueryClient();

export default function App() {
  const RootRedirect = () => {
    // Verificar apenas se existe token no localStorage
    // Se não tem token, redireciona para login
    // Se tem token, redireciona para home (o UserDataLoader vai validar o token)
    // Se o token for inválido, o UserDataLoader vai limpar e as rotas protegidas vão redirecionar de volta
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    
    // Se tem token, redireciona para home
    // O UserDataLoader vai tentar carregar os dados do usuário
    // Se o token for inválido, o UserDataLoader vai limpar o token
    // e as rotas protegidas vão redirecionar de volta para login
    return <Navigate to="/home" replace />;
  }

  const ProtectedRoute = ({ element: Element, ...rest }) => {
    const { userData } = useUser();
    const isAuthenticated = !!userData || !!localStorage.getItem('accessToken');
    return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" replace />;
  }

  const PublicRoute = ({ element: Element, ...rest }) => {
    const { userData } = useUser();
    const isAuthenticated = !!userData || !!localStorage.getItem('accessToken');
    return !isAuthenticated ? <Element {...rest} /> : <Navigate to="/home" replace />;
  }

  // Rota de convite sempre acessível (não redireciona usuários autenticados)
  const InviteRoute = ({ element: Element, ...rest }) => {
    return <Element {...rest} />;
  }

  // Rota de funcionário - verifica token de funcionário
  const EmployeeRoute = ({ element: Element, ...rest }) => {
    const employeeToken = localStorage.getItem('employeeToken') || localStorage.getItem('employeeAccessToken');
    return employeeToken ? <Element {...rest} /> : <Navigate to="/employee/login" replace />;
  }

  // Rota pública de login de funcionário
  const EmployeeLoginRoute = ({ element: Element, ...rest }) => {
    const employeeToken = localStorage.getItem('employeeToken') || localStorage.getItem('employeeAccessToken');
    return !employeeToken ? <Element {...rest} /> : <Navigate to="/employee" replace />;
  }
  
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <UserDataLoader />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<RootRedirect />} />
            <Route path='/login' element={ <PublicRoute element={LoginPage} /> } />
            <Route path='/convite/:code' element={ <InviteRoute element={InvitePage} /> } />
            <Route path='/home' element={ <ProtectedRoute element={HomePage} /> } />
            <Route path='/profile' element={ <ProtectedRoute element={ProfilePage} /> } />
            <Route path='/employee/login' element={ <EmployeeLoginRoute element={EmployeeLoginPage} /> } />
            <Route path='/employee' element={ <EmployeeRoute element={EmployeePage} /> } />
            <Route path='/aboutus' element={ <AboutUsPage /> } />
            <Route path='*' element={ <NotFoundPage /> } />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </QueryClientProvider>
  );
}