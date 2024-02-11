import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { IndexPage } from './pages/Index';
import { LoginPage } from './pages/Login';
import { Navigation } from './components/Navigation';
import { AuthProvider } from './contexts/authContext';

function App() {

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <AuthProvider>
      <Router>
        <div className={`App ${darkMode ? 'dark' : ''}`}>
          <Navigation
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <Routes>
            <Route path="/" element={<IndexPage darkMode={darkMode} />} />
            <Route
              path="/login"
              element={<LoginPage darkMode={darkMode}/>}
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;