import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Navigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000/"
});

export function LoginPage({ darkMode }) {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  axios.defaults.withCredentials = true;

  const client = axios.create({
    baseURL: "http://127.0.0.1:8000/"
  });

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

  const submitLogin = (e) => {
    e.preventDefault();
    client.post('/unitracker/login/', { username, password })
      .then(() => {
        setCurrentUser(true);
      })
      .catch(() => {
        setCurrentUser(false);
        localStorage.removeItem('currentUser'); // Si el inicio de sesión falla, elimina el usuario del almacenamiento local
      });
  }

  if (currentUser) {
    return <Navigate to="/" replace={true} />
  }

  return (
    <div className={`min-h-screen flex justify-center items-center ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className={`max-w-md p-6 bg-white w-[85vw] md:w-auto rounded-lg shadow-md ${darkMode ? 'bg-slate-800 text-white' : 'text-black'}`}>
        <div className={`text-xl font-bold text-center select-none ${darkMode ? 'text-white' : 'text-black'}`}>
          <h2><span className="text-emerald-500">Uni</span>Tracker</h2>
        </div>
        <form onSubmit={submitLogin}>
          <div className="mb-4 mt-4">
            <label className={`block text-gray-700 text-sm font-bold mb-2 ${darkMode ? 'text-gray-50' : 'text-black'}`} htmlFor="username">
              Nombre de Usuario
            </label>
            <input
              className={`w-full border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-slate-900 text-white' : 'bg-white'}`}
              id="username"
              type="text"
              placeholder="Nombre de Usuario"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className={`block text-gray-700 text-sm font-bold mb-2 ${darkMode ? 'text-gray-50' : 'text-black'}`} htmlFor="password">
              Contraseña
            </label>
            <input
              className={`w-full border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-slate-900 text-white' : 'bg-white'}`}
              id="password"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="">
            <button
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <Link to="/register" className="text-emerald-500 hover:underline">
            ¿No tienes una cuenta? Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
}
