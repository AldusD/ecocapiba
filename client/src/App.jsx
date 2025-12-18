import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from './context/UserContext';
import { useUser } from './context/UserContext';

import React from 'react';

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
    const { userData } = useUser();
    const isAuthenticated = !!userData || !!localStorage.getItem('accessToken');
    return isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />;
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