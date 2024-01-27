import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { IndexPage } from './pages/Index';
import { LoginPage } from './pages/Login';
import { Navigation } from './components/Navigation';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path='/' element={<IndexPage />}/>
        <Route path='/login' element={<LoginPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App