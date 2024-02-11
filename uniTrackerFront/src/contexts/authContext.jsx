import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000/"
});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = async (username, password) => {
    // Make a POST request to your Django server with axios
    const response = await client.post('/unitracker/login/', { username, password });
    setCurrentUser(response.data);
    console.log(response)
  };

  const logout = async () => {
    // Make a POST request to your Django server with axios
    await client.post('/unitracker/logout/', {}, {
      withCredentials: true,
      headers: {
        'X-CSRFToken': getCookie('csrftoken')
      }
    });
    setCurrentUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};