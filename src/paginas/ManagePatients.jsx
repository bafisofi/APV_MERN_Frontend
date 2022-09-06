import {useState} from 'react'
import Formulary from "../components/Formulary"
import ListingPatients from "../components/ListingPatients"


const ManagePatients = () => {

  const [mostrarFormulario, setmostrarFormulario] = useState(false)
  return (
    <div className="flex flex-col md:flex-row">
        <button
          type='button'
          className='bg-indigo-600 text-white font-bold uppercase mx-10 p-3 rounded-md mb-10 md:hidden' onClick={()=>setmostrarFormulario(!mostrarFormulario)}
        >
         {mostrarFormulario ? 'Hide Formulary': 'Show Formulary' }</button>
        <div className={`${mostrarFormulario ? 'block' : 'hidden'} md:block md:w-1/2 lg:w-2/5`}>
          <Formulary/>
        </div>
        <div className="md:w-1/2 lg:w-3/5">
          <ListingPatients/>
        </div>
    </div>
  )
}

export default ManagePatients