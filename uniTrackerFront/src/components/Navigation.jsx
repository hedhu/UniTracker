import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/authContext';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000/"
});


export function Navigation({ darkMode, toggleDarkMode }) {
  const { currentUser, setCurrentUser, login, logout } = useContext(AuthContext);
  const [mobileNavVisible, setMobileNavVisible] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      // Make a GET request to your Django server with axios
      const response = await client.get('/unitracker/user/');
      setCurrentUser(response.data);
    };
  
    checkUser();
  }, []);

  useEffect(() => {
    // Al cargar la página, verifica si hay un usuario en el almacenamiento local
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    } else {
      checkUser();
    }
  }, []);
  
  useEffect(() => {
    // Cada vez que currentUser cambia, actualiza el almacenamiento local
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [currentUser]);
  
  const checkUser = () => {
    client.get('/unitracker/user/')
      .then((res) => setCurrentUser(true))
      .catch(() => setCurrentUser(false));
  }

  
  const toggleMobileNav = () => {
    setMobileNavVisible(!mobileNavVisible);
  };

  const hideMobileNav = () => {
    setMobileNavVisible(false);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <button
        className={`md:hidden fixed top-4 right-4 z-50 bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-emerald-400 focus:outline-none`}
        onClick={toggleMobileNav}
      >
        {mobileNavVisible ? "X" : "="}
      </button>
      <header
        className={`md:flex sm:w-3/12 md:w-full md:shadow-none shadow-md md:rounded-none fixed top-0 left-0 w-full z-50 flex flex-col sm:flex-row justify-between items-center lg:px-16 px-16 md:p-4 md:h-[80px] pt-4 pb-4 md:pb-0 md:pt-0 transition duration-500 ${(mobileNavVisible) ? (darkMode ? 'dark bg-gray-900' : 'bg-[#F9F9F9]') : 'hidden'}`}>
        <div className="flex items-center mb-3 sm:mb-0">
          <Link to="/" className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
            <h1><span className="text-emerald-500">Uni</span>Tracker</h1>
          </Link>
        </div>
        <nav className="flex flex-col sm:flex-row sm:space-x-6 text-center md:items-center  md:ml-4 md:mr-4">
          <Link to="/notas" className={`hover:text-emerald-500 transition-colors text-sm duration-300 mb-2 sm:mb-0 ${darkMode ? 'text-white' : 'text-gray-700'}`} style={{ whiteSpace: 'nowrap' }}>
            Notas
          </Link>
          <Link to="/calcular-promedio" className={`hover:text-emerald-500  text-sm  transition-colors duration-300 mb-2 sm:mb-0 ${darkMode ? 'text-white' : 'text-gray-700'}`} style={{ whiteSpace: 'nowrap' }}>
            Calcular Promedio
          </Link>
          <Link to="/escala-de-notas" className={`hover:text-emerald-500 text-sm  transition-colors duration-300 mb-2 sm:mb-0 ${darkMode ? 'text-white' : 'text-gray-700'}`} style={{ whiteSpace: 'nowrap' }}>
            Escala De Notas
          </Link>
          <Link to="/fechas" className={`hover:text-emerald-500 text-sm  transition-colors duration-300 mb-2 sm:mb-0 ${darkMode ? 'text-white' : 'text-gray-700'}`} style={{ whiteSpace: 'nowrap' }}>
            Fechas
          </Link>
        </nav>

        <div className="flex flex-col items-center md:flex-row md:gap-4">
          <button onClick={toggleDarkMode} className={`bg-emerald-500 py-2 md:py-0  md:bg-transparent px-2 md:px-0 md:hover:text-emerald-500 rounded-lg transition text-sm duration-500 inline-block mb-2 md:mb-0 ${darkMode ? 'text-white' : 'md:text-gray-700 text-white'}`}>
            {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
          </button>
          {currentUser && (
            <form onSubmit={handleLogout} className="flex items-center">
              <button type='submit' className="bg-emerald-500 transition duration-500 text-white px-4 py-2 rounded-lg shadow-xl hover:bg-emerald-400">
                Log out
              </button>
            </form>
          )}

          {/* Botón de Registro y Login */}
          {!currentUser && (
            <>
              <div className={`hidden md:block border text-sm  border-emerald-500 rounded-lg px-4 py-2 ${darkMode ? 'dark:border-gray-700' : ''}`}>
                <Link to="/login" className={`transition duration-500 hover:text-emerald-500 inline-block ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                  Login
                </Link>
              </div>
              <Link to="/register" className="hidden md:block flex items-center">
                <button className={`transition text-sm  duration-500 px-4 py-2 rounded-lg shadow-xl ${darkMode ? 'bg-emerald-500 text-white hover:bg-emerald-400 border-2 border-emerald-500 hover:border-emerald-400' : 'bg-emerald-500 text-white hover:bg-emerald-400 border-2 border-emerald-500 hover:border-emerald-400'}`}>
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </header>
      {mobileNavVisible && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-50"
          onClick={hideMobileNav}
        />
      )}
    </>
  );
}
