import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { IndexPage } from './pages/Index';
import { Navigation } from './components/Navigation';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path='/' element={<IndexPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App