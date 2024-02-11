import React from 'react';
import { Link } from 'react-router-dom';

export function IndexPage({ darkMode }) {

    return (
        <div className={`relative flex flex-col justify-center items-center h-screen px-16 ${darkMode ? 'bg-gray-900' : ''}`}>
            <div className="absolute inset-0 flex justify-center items-center">
                <div className="absolute w-32 h-32 rounded-full bg-emerald-500 opacity-50 top-1/4 left-1/4"></div>
                <div className="absolute w-48 h-48 rounded-full bg-emerald-500 opacity-50 bottom-1/4 right-1/4"></div>
            </div>
            <div className="z-10 text-center">
                <h1 className={`text-5xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Bienvenido a <span className="text-emerald-500">UniTracker</span></h1>
            </div>
            <div className="z-10 p-6 mt-8 text-center">
                <p className={`text-md ${darkMode ? 'text-white' : 'text-gray-900'}`}>UniTracker es tu compañero académico todo en uno. Además de gestionar tus notas y calcular tu promedio, también te permite configurar recordatorios y más.</p>
            </div>
            <div className="z-10 flex gap-3">
                <div className={`border border-emerald-500 rounded-lg px-4 py-2 ${darkMode ? 'dark:border-gray-700' : ''}`}>
                    <Link to="/login" className={`transition duration-500 hover:text-emerald-500 inline-block ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                        Login
                    </Link>
                </div>
                <Link to="/register" className="flex items-center">
                    <button className={`transition duration-500 px-4 py-2 rounded-lg shadow-xl ${darkMode ? 'bg-emerald-600 text-white hover:bg-emerald-400 border-2 border-emerald-600 hover:border-emerald-400' : 'bg-emerald-500 text-white hover:bg-emerald-400 border-2 border-emerald-500 hover:border-emerald-400'}`}>
                        Register
                    </button>
                </Link>
            </div>
        </div>
    );
}
