import {useState, useEffect} from 'react'
import Alerta from './Alerta';
import usePacientes from '../hooks/usePacientes';


const Formulary = () => {
  const [nombre, setNombre] = useState('');
  const [propietario,setPropietario] = useState('');
  const [email,setEmail] = useState('');
  const [fecha,setFecha] = useState('');
  const [sintomas,setSintomas] = useState('');
  const [id, setId] = useState(null);

  const[alerta, setAlerta] = useState({});

  const {guardarPaciente,paciente} = usePacientes();

  useEffect(()=>{
    if(paciente?.nombre){
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
      setId(paciente._id)
    }
   
  },[paciente])


 
  const handleSubmit = e =>{
    e.preventDefault();
    

    //Validar el formulario
    if([nombre, propietario, email, fecha, sintomas].includes('')){
       setAlerta({msg: 'There are empty fields', error:true})
       return
    }

    
    guardarPaciente({nombre, propietario, email, fecha, sintomas,id})
    setAlerta({
      msg:'Saved successfully'
    })
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
    setId('')
  }

  const {msg} = alerta

  return (
    <>
       <h2 className="font-black text-3xl text-center">Patient Manager</h2>
      <p className="text-xl mt-5 mb-10 text-center">
         Add your Patients and {''}
        <span className="text-indigo-600 font-bold">Manage them</span>
      </p>
  
   <form 
     className=' bg-white py-10 lg:mx-8 px-5 mb-10 lg:mb-5 shadow-md 
     rounded-md' 
      onSubmit ={handleSubmit}>
     <div className='mb-5'>
       <label 
        htmlFor='nombre'
        className='text-gray-700 uppercase font-bold'      
       >Pet Name</label>
       <input 
         id ="nombre"
         type="text"
         placeholder='Pet Name'
         className='border-2 w-full p-2 mt-2 placeholder:-grey- rounded-md'
         value={nombre}
         onChange={e =>setNombre(e.target.value)}
       />
     </div>
     <div className='mb-5'>
       <label 
        htmlFor='propietario'
        className='text-gray-700 uppercase font-bold'      
       >Pet Owner</label>
       <input 
         id ="propietario"
         type="text"
         placeholder='Pet Owner'
         className='border-2 w-full p-2 mt-2 placeholder:-grey- rounded-md'
         value={propietario}
         onChange={e =>setPropietario(e.target.value)}
       />
     </div>
     <div className='mb-5'>
       <label 
        htmlFor='email'
        className='text-gray-700 uppercase font-bold'      
       >Owner Email</label>
       <input 
         id ="email"
         type="email"
         placeholder='Owner Email'
         className='border-2 w-full p-2 mt-2 placeholder:-grey- rounded-md'
         value={email}
         onChange={e =>setEmail(e.target.value)}
       />
     </div>
     <div className='mb-5'>
       <label 
        htmlFor='fecha'
        className='text-gray-700 uppercase font-bold'      
       >Entry Date</label>
       <input 
         id ="fecha"
         type="date"
         className='border-2 w-full p-2 mt-2 placeholder:-grey- rounded-md'
         value={fecha}
         onChange={e =>setFecha(e.target.value)}
       />
     </div>
     <div className="mb-5">
       <label 
        htmlFor='sintomas'
        className='text-gray-700 uppercase font-bold'      
       >Symptoms</label>
       <textarea 
         id ="sintomas"
         placeholder='Describe the Symptoms'
         className='border-2 w-full p-2 mt-2 placeholder:-grey- rounded-md'
         value={sintomas}
         onChange={e =>setSintomas(e.target.value)}
       />
     </div>
     <input 
        type="submit"
        className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-800 cursor-pointer transition-colors"
        value={ id ?'Save Changes' :'Add Pacient'}
     
     />
   </form>

   {msg && <Alerta alerta ={alerta}/>}
   </>
  )
}

export default Formulary