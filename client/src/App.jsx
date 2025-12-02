import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import HomePage from './components/pages/HomePage';
import NotFoundPage from './components/pages/NotFoundPage';
import AboutUsPage from  './components/pages/AboutUsPage'

const queryClient = new QueryClient();

export default function App() {

  return (
    <QueryClientProvider client={queryClient} >
    <BrowserRouter >
        <Routes>  // order matters, notfound must be last
            <Route path='/' element={ <AboutUsPage /> } />
            <Route path='/home' element={ <HomePage /> } />
            <Route path='*' element={ <NotFoundPage /> } />
        </Routes>
    </BrowserRouter>
    </QueryClientProvider> 
  );
}