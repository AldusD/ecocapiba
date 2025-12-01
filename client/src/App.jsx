import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import HomePage from './components/pages/HomePage';
import AboutUsPage from './components/pages/AboutUsPage';
import NotFoundPage from './components/pages/NotFoundPage';

const queryClient = new QueryClient();

export default function App() {

  return (
    <QueryClientProvider client={queryClient} >
    <BrowserRouter >
        <Routes>  
            <Route path='/' element={ <AboutUsPage /> } />
            <Route path='/home' element={ <HomePage /> } />
            <Route path='*' element={ <NotFoundPage /> } />
        </Routes>
    </BrowserRouter>
    </QueryClientProvider> 
  );
}