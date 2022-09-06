import { useEffect,useState } from 'react';
import {useParams, Link} from 'react-router-dom'
import axios from 'axios'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios';

const ConfirmAccount = () => {
  
  const[cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando,setCargando] = useState(true);
  const[alerta,setAlerta] = useState({})

  const params = useParams();
  const {id} = params;

  useEffect(()=>{
    const confirmarCuenta = async ()=>{
     
      try {
         const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarians/confirm/${id}`
         const {data} = await clienteAxios(url)
         setCuentaConfirmada(true)
         setAlerta({
          msg:data.msg,
         })
      } catch (error) {
        setAlerta({
          msg:error.response.data.msg,
          error:true
        })
      }

      setCargando(false);
  }
  confirmarCuenta();
   },[])

  return (
    <>
     <div className="md:flex items-center flex-col ">
      <h1 className='text-indigo-600 font-black text-4xl text-center '>
      Confirm your account and start managing  {""} 
        <span className='text-black'>your Patients</span>
      </h1>
      <img className="object-contain max-h-72 w-auto mt-8 mx-auto" src="../../public/SystemImage.png" alt="Image of the System"  />
     </div>

    <div className='mt-20 md:mt-0 shadow-lg px-5 py-10 rounded-xl bg-white'>
      {!cargando && <Alerta 
        alerta={alerta}
      />}

      {cuentaConfirmada &&( <Link className ='block text-center my-5 text-gray-500' 
         to ="/">Log in</Link>)}
    </div>
    
    </>
  )
}

export default ConfirmAccount