import { Link } from 'react-router-dom'

export function Navigation() {
  return (
    <div className='flex justify-between py-3'>
        <div>
          <Link to='/'>
              <h1 className='font-bold text-3xl mb-3'>UniTracker</h1>
          </Link>
        </div>
        <div className=''>
          <a className=''>
            <Link to=''>Notas</Link>
          </a>
          <a className=''>
            <Link to=''>Calcular Promedio</Link>
          </a>
          <a className=''>
            <Link to=''>Escala De Notas</Link>
          </a>
          <a className=''>
            <Link to=''>Fechas</Link>
          </a>
        </div>
        <div>
          <a className=''>
            <Link to='/'>Login</Link>
          </a>
          <button className='bg-emerald-500 px-3 py-2 rounded-lg'>
            <Link to='/'>Register</Link>
          </button>
        </div>
    </div>
  )
}
