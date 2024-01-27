import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000/"
});


export function Navigation() {
  const [currentUser, setCurrentUser] = useState();
  const [asignaturas, setAsignaturas] = useState([]);

  useEffect(() => {

    getUser();
    getAsignaturas();

  }, []);

  const getUser = () => {
    client.get('unitracker/user/') 
      .then( (res) => setCurrentUser(true) )
      .catch((err) => {
          setCurrentUser(false)
    });
  }

  const getAsignaturas = () => {
    client.get('unitracker/api/asignaturas/') 
      .then( (res) => { 
        setAsignaturas(res.data)  
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
    });
  }

  function submitLogout(e) {
    e.preventDefault();
    client.post(
      "/unitracker/logout",
      {withCredentials: true}
    ).then(function(res) {
      setCurrentUser(false);
    });
  }

  if (currentUser) {
    return (
      <header className="flex flex-col sm:flex-row justify-between items-center px-16 h-[80px]">
        <div className="flex items-center mb-3 sm:mb-0">
          <Link to="/" className="text-black text-xl font-bold hover:text-gray-800">
            <h1><span className="text-emerald-500">Uni</span>Tracker</h1>
          </Link>
        </div>
        <nav className="flex flex-col sm:flex-row sm:space-x-6 text-center">
          <Link to="/notas" className="text-gray-700 hover:text-emerald-500 transition-colors duration-300 mb-2 sm:mb-0">
            Notas
          </Link>
          <Link to="/calcular-promedio" className="text-gray-700 hover:text-emerald-500 transition-colors duration-300 mb-2 sm:mb-0">
            Calcular Promedio
          </Link>
          <Link to="/escala-de-notas" className="text-gray-700 hover:text-emerald-500 transition-colors duration-300 mb-2 sm:mb-0">
            Escala De Notas
          </Link>
          <Link to="/fechas" className="text-gray-700 hover:text-emerald-500 transition-colors duration-300 mb-2 sm:mb-0">
            Fechas
          </Link>
        </nav>
        <div className="flex flex-col items-center md:flex-row md:gap-4">
        <form onSubmit={e => submitLogout(e)} className="flex items-center">
            <button type='submit' className="bg-emerald-500 transition duration-500 text-white px-4 py-2 rounded-lg shadow-xl hover:bg-emerald-400">
              LogOut
            </button>
          </form>
        </div>
      </header>
    )
  } 
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center px-16 h-[80px]">
    <div className="flex items-center mb-3 sm:mb-0">
      <Link to="/" className="text-black text-xl font-bold hover:text-gray-800">
        <h1><span className="text-emerald-500">Uni</span>Tracker</h1>
      </Link>
    </div>
    <nav className="flex flex-col sm:flex-row sm:space-x-6 text-center">
      <Link to="/notas" className="text-gray-700 hover:text-emerald-500 transition-colors duration-300 mb-2 sm:mb-0">
        Notas
      </Link>
      <Link to="/calcular-promedio" className="text-gray-700 hover:text-emerald-500 transition-colors duration-300 mb-2 sm:mb-0">
        Calcular Promedio
      </Link>
      <Link to="/escala-de-notas" className="text-gray-700 hover:text-emerald-500 transition-colors duration-300 mb-2 sm:mb-0">
        Escala De Notas
      </Link>
      <Link to="/fechas" className="text-gray-700 hover:text-emerald-500 transition-colors duration-300 mb-2 sm:mb-0">
        Fechas
      </Link>
    </nav>
    <div className="flex flex-col items-center md:flex-row md:gap-4">
    <Link to="/login" className="text-gray-700 transition duration-500 hover:text-emerald-500 inline-block mb-2 md:mb-0">
      Login
    </Link>
    <Link to="/register" className="flex items-center">
        <button className="bg-emerald-500 transition duration-500 text-white px-4 py-2 rounded-lg shadow-xl hover:bg-emerald-400">
          Register
        </button>
      </Link>
    </div>
  </header>
  )
}
