import {Link} from 'react-router-dom'
import clienteAxios from '../config/axios'
import {useState} from 'react'
import Alerta from '../components/Alerta'
import SystemImage  from '../img/SystemImage.png';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alerta, setAlerta] = useState ({})

  const handleSubmit  = async e =>{
      e.preventDefault();
      console.log('Enviando formulario')
      if([nombre, email, password, repetirPassword].includes('')){
         setAlerta({msg: 'There are empty fields', error:true})
         return
      }
      if(password !==repetirPassword){
        setAlerta({msg: 'Passwords do not match', error:true})
        return
      }

      if(password.length< 6){
        setAlerta({msg: 'The password is too short, add at least 6 characters.', error:true})
        return
      }

     setAlerta({})


     //Crear el Uusario en la api

    try {
       await clienteAxios.post('/veterinarians',{
        nombre, email, password
      })
      setAlerta({
        msg:'Successfully created, check your email',
        error:false
      })
      setNombre('');
      setEmail('');
      setPassword('');
      setRepetirPassword('');
      
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
      <h1 className='text-indigo-600 font-black text-6xl text-center '>
        Log in and Manage {""} 
        <span className='text-black'>your Patients</span>
      </h1>
      <img className="object-contain max-h-80 w-auto mt-8 mx-auto" src={SystemImage} alt="Image of the System"  />
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
          Name
        </label>
        <input 
          type="text"
          placeholder="Your Name"
          className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />
       </div> 

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

       <div className='my-5'>
        <label
          className="uppercase text-gray-600 block text-xl font-bold"
        >
          Password
        </label>
        <input 
          type="password"
          placeholder="Your Password"
          className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
       </div> 

       <div className='my-5'>
        <label
          className="uppercase text-gray-600 block text-xl font-bold"
        >
          Repeat Password
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
         value="Sign up"
         className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto'
         />
      </form>

      <nav className='mt-8 lg:flex lg:justify-between'>
       <Link className ='block text-center my-5 text-gray-500' 
         to ="/">Already have an account? Log in</Link>
       <Link className ='block text-center my-5 text-gray-500' 
         to ="/password-forgotten">I forgot my password</Link>
      </nav>

    </div>
    

    
  </>
  )
}

export default Register