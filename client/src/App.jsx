import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from './context/UserContext';

import HomePage from './components/pages/HomePage';
import AboutUsPage from './components/pages/AboutUsPage';
import NotFoundPage from './components/pages/NotFoundPage';
import EmployeePage from './components/pages/EmployeePage';
import LoginPage from './components/pages/LoginPage/LoginPage';

const queryClient = new QueryClient();

export default function App() {

  const isAuthenticated = !!localStorage.getItem('accessToken');

  const ProtectedRoute = ({ element: Element, ...rest }) => {
    return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" replace />;
  }

  const PublicRoute = ({ element: Element, ...rest }) => {
    return !isAuthenticated ? <Element {...rest} /> : <Navigate to="/home" replace />;
  }

  return (
    <QueryClientProvider client={queryClient} >
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={
              isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />
            } />
            <Route path='/login' element={ <PublicRoute element={LoginPage} /> } />
            <Route path='/home' element={ <ProtectedRoute element={HomePage} /> } />
            <Route path='/employee' element={ <ProtectedRoute element={EmployeePage} /> } />
            <Route path='/aboutus' element={ <AboutUsPage /> } />
            <Route path='*' element={ <NotFoundPage /> } />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </QueryClientProvider> 
  );
}