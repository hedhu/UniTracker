import { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: "http://127.0.0.1:8000/"
});
  

export function LoginPage() {
    const [currentUser, setCurrentUser] = useState();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {

        getUser();

      }, []);

      const getUser = () => {
        client.get('/unitracker/user/') 
            .then( (res) => setCurrentUser(true))
            .catch((err) => {
                setCurrentUser(false)
            });
      }
    
      function submitLogin(e) {
        e.preventDefault();
        client.post(
          'unitracker/login/',
          {
            username: username,
            password: password
          }
        ).then(function(res) {
          setCurrentUser(true);
        });
      }

    if (currentUser) {
        return <Navigate to="/" replace={true} />
    }
    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white border rounded shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Inicio de Sesión</h2>
          <form onSubmit={e => submitLogin(e)}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Nombre de Usuario
              </label>
              <input
                className="w-full border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Nombre de Usuario"
                name="username"
                value={username}
                onChange={e => setUsername(e.target.value)} 
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Contraseña
              </label>
              <input
                className="w-full border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Contraseña"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>

    );
}