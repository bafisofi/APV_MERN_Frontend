import { useState, useEffect } from "react";
import{useParams, Link} from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from "../config/axios";


const NewPassword = () => {
  const [password, setPassword] =useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const[alerta,setAlerta] = useState({});
  const[tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false)

  const handleSubmit  = async e =>{
    e.preventDefault();

    if(password !==repetirPassword){
      setAlerta({msg: 'Passwords do not match', error:true})
      return
    }

    if(password.length< 6){
      setAlerta({msg: 'The password is too short, add at least 6 characters.', error:true})
      return
    }

    try {
      const url = `/veterinarians/password-forgotten/${token}`
      const {data} =await clienteAxios.post(url,{
        password
      })
      setAlerta({
        msg:data.msg
      })
      setPassword('');
      setRepetirPassword('');
      setPasswordModificado(true)
     } catch (error) {
      setAlerta({
        msg:error.response.data.msg,
        error:true
      })
    }
}

  
  const params = useParams();
  const {token} = params
  useEffect(()=>{
    const comprobarToken = async()=>{
      try {
        await clienteAxios(`/veterinarians/password-forgotten/${token}`);
        setAlerta({
          msg:'Enter your new password',

         })
        setTokenValido(true) 
      } catch (error) {
         setAlerta({
          msg: 'There was an error with the link',
          error:true
         })
      }
    }
    comprobarToken()
  },[])
  
  const {msg} = alerta


  return (
    <>
    <div className="md:flex items-center flex-col ">
      <h1 className='text-indigo-600 font-black text-4xl text-center '>
      Reset your password and don't lose access to {""} 
        <span className='text-black'>your Patients</span>
      </h1>
      <img className="object-contain max-h-72 w-auto mt-8 mx-auto" src="../../public/SystemImage.png" alt="Image of the System"  />
     </div>
    
     <div className='mt-20 md:mt-0 shadow-lg px-5 py-10 rounded-xl bg-white'>
     { msg && <Alerta 
        alerta = {alerta}
     />}
     

     {tokenValido &&(
       <>
       <form 
       onSubmit ={handleSubmit}
       >

       <div className='my-5'>
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              New Password
            </label>
            <input 
              type="password"
              placeholder="Your new Password"
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={password}
              onChange={e => setPassword(e.target.value)}
             />
          </div>  

          <div className='my-5'>
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Repeat New Password
            </label>
            <input 
              type="password"
              placeholder="Repeat Your Password"
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={repetirPassword}
              onChange={e => setRepetirPassword(e.target.value)}
            />
          </div> 

          <input 
            type="submit"
            value="Save New Password"
            className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto'
          />
        </form>

       
        </>   
          )}
         {passwordModificado &&  
          <Link 
          className ='block text-center my-5 text-gray-500' 
           to ="/">Log in </Link>}
    </div>
   </>
     
  )
}

export default NewPassword