import { useState } from 'react'
import {Link} from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'


const ForgottenPassword = () => {
  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState ({});

  
  const handleSubmit  = async e =>{
    e.preventDefault();
    
   
    if(email==='' || email.length <6){
      setAlerta({msg:'The email is required', error:true})
      return
     }

     try {
      const {data} =await clienteAxios.post('/veterinarians/password-forgotten',{
        email
      })

      setAlerta({
        msg:data.msg
      })
      setEmail('');
     } catch (error) {
      setAlerta({
    
        msg:error.response.data.msg,
        error:true
      })
    }
}

const {msg} = alerta


  return (
    <>
      <div className="md:flex items-center flex-col ">
      <h1 className='text-indigo-600 font-black text-3xl text-center '>
      Recover your password and don't Lose {""} 
        <span className='text-black'>your Patients</span>
      </h1>
      <img className="object-contain max-h-60 w-auto mt-8 mx-auto" src="../../public/SystemImage.png" alt="Image of the System" />
     </div>
     
     <div className='mt-20 md:mt-0 shadow-lg px-5 py-10 rounded-xl bg-white'>
     
     { msg && <Alerta 
        alerta = {alerta}
     />}
     <form 
       onSubmit ={handleSubmit}
     >
       
     <div className='my-5'>
        <label
          className="uppercase text-gray-600 block text-xl font-bold"
        >
          Email
        </label>
        <input 
          type="email"
          placeholder="Your Registration Email"
          className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
       </div> 

       <input 
         type="submit"
         value="Send instructions"
         className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto'
         />
     </form>

     <nav className='mt-8 lg:flex lg:justify-between'>
       <Link className ='block text-center my-5 text-gray-500' 
         to ="/">Already have an account? Sign In</Link>
        <Link className ='block text-center my-5 text-gray-500' 
         to ="/register">Don't have an account yet? Log in</Link>
      </nav>
    </div> 
    

 
    </>
  )
}

export default ForgottenPassword