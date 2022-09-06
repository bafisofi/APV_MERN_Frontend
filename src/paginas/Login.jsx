import { Link, useNavigate } from 'react-router-dom'
import {useState} from 'react'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'
import useAuth from '../hooks/useAuth'
import SystemImage  from '../img/SystemImage.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState ({})

  const {setAuth} = useAuth()

  const navigate = useNavigate()

  const handleSubmit  = async e =>{
    e.preventDefault();
    
    if([email, password].includes('')){
       setAlerta({msg: 'There are empty fields', error:true})
       return
    }
    
  
  try {
    const {data} = await clienteAxios.post('/veterinarians/login',{
       email, password
    })
    localStorage.setItem('token',data.token)
    setAuth(data);
    navigate('/admin')
    setAlerta({
      msg:data.msg
    })
   
    setEmail('');
    setPassword(''); 
    
    
  } catch (error) {
    setAlerta({
      msg:error.response.data.msg,
      error:true
    })
  }


}
const {msg} = alerta
  const {auth} = useAuth()

  console.log(auth);
  return (
    <>
    
     <div>
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
          Email
        </label>
        <input 
          type="email"
          placeholder="Your Registration Email"
          className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
          value ={email}
          onChange = {e => setEmail(e.target.value)}
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
          value ={password}
          onChange = {e => setPassword(e.target.value)}
        />
       </div>

       <input 
         type="submit"
         value="Log in"
         className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto'
         />
     </form>

     <nav className='mt-10 lg:flex lg:justify-between'>
       <Link className ='block text-center my-5 text-gray-500' 
         to ="/register">Don't have an account yet?  Sign Up</Link>
       <Link className ='block text-center my-5 text-gray-500' 
         to ="/password-forgotten">I forgot my password</Link>
     </nav>
    </div>


    </>
  )
}

export default Login