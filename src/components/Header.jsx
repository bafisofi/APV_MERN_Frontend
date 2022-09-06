import {Link} from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Header = () => {
    const {cerrarSesion} = useAuth()
  return (
     <header className="py-10 md:px-8  bg-indigo-600">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <h1 className=" font-bold text-2xl text-indigo-200 text-center">APV-{''}
          <span className="text-white font-black">Veterinary</span > Patient Manager
        </h1>

        <nav className='flex flex-col items-center lg:flex-row gap-4 mt-5 lg:mt-0'>

           <Link to="/admin" className='text-white text-sm uppercase font-bold '>Pacients</Link>
           <Link to ="/admin/profile" className='text-white text-sm uppercase font-bold '>Profile</Link>

           <button className='text-white text-sm uppercase font-bold ' type='button' onClick={cerrarSesion}>
           Log out
           </button>
        </nav>
      </div>

    </header>
  )
}

export default Header