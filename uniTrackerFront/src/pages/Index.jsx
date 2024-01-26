import { Link } from 'react-router-dom'

export function IndexPage() {
    return (
        <div className="relative flex flex-col justify-center items-center h-[calc(100vh-80px)] px-16">
            <div className="absolute inset-0 flex justify-center items-center">
                <div className="absolute w-32 h-32 rounded-full bg-emerald-500 opacity-50 top-1/4 left-1/4"></div>
                <div className="absolute w-48 h-48 rounded-full bg-emerald-500 opacity-50 bottom-1/4 right-1/4"></div>

            </div>
            <div className="z-10 text-center">
                <h1 className="text-5xl font-bold">Bienvenido a <span className="text-emerald-500">UniTracker</span></h1>
            </div>
            <div className="z-10 p-6 mt-8 text-center">
                <p className="text-md text-gray-900">UniTracker es tu compañero académico todo en uno. Además de gestionar tus notas y calcular tu promedio, también te permite configurar recordatorios y más.</p>
            </div>
            <div className="z-10 flex gap-3">
                <Link to="/login" className="text-gray-700 px-4 transition duration-500 py-2 rounded-lg shadow-xl hover:bg-gray-200 hover:border-gray-200 border-2 border-gray-100 bg-gray-100">
                    Login
                </Link>
                <Link to="/register" className="flex items-center">
                    <button className="bg-emerald-500  transition duration-500 text-white px-4 py-2 rounded-lg shadow-xl hover:bg-emerald-400 border-2 border-emerald-500 hover:border-emerald-400">
                        Register
                    </button>
                </Link>
            </div>
        </div>

    )
}