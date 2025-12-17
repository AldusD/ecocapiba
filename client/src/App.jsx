import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import HomePage from './components/pages/HomePage';
import AboutUsPage from './components/pages/AboutUsPage';
import NotFoundPage from './components/pages/NotFoundPage';
import EmployeePage from './components/pages/EmployeePage';
import ProfilePage from './components/pages/ProfilePage';

const queryClient = new QueryClient();

export default function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>  {/* order matters, notfound must be last */}
          <Route path='/' element={<AboutUsPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/employee' element={<EmployeePage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider> 
  );
}
