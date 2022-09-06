import { useEffect, useState } from "react"
import AdminNav from "../components/AdminNav"
import Alerta from "../components/Alerta"
import useAuth from "../hooks/useAuth"

const EditProfile = () => {

  const { auth, actualizarPerfil } = useAuth()
  const [ perfil, setPerfil ] = useState({})
  const [alerta, setAlerta] = useState({})

  useEffect( ()=>{
  setPerfil(auth)
}, [auth])

const handleSubmit =async e =>{
  e.preventDefault();
  const {nombre, email} = perfil
  if([nombre,email].includes('')){
    setAlerta({
      msg:'Email and Name are mandatory',
      error:true
    })
    return;
  }
  const resultado= await actualizarPerfil(perfil);
  setAlerta(resultado)
}

const {msg} = alerta



  return (
    <>
      <AdminNav/>
      <h2 className="font-black text-3xl text-center mt-14">Edit Profile</h2>
      <p className="text-xl mt-5 mb-10 text-center">Modify your {''} <span className="text-indigo-600 font-bold">Information here</span></p>

      <div className="flex justify-around md:flex-row flex-col ">
        <div>
        <img className="object-contain max-h-96 w-auto md:mt-14  mt-8 mb-12  mx-auto" src="../../public/SystemImage.png" alt="Image of the System"  />
        </div>
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          {msg && <Alerta alerta ={alerta}/>}
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">Name</label>
              <input 
              type="text" 
              className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
              name="nombre"
              value={perfil.nombre || ''} 
              onChange={ e => setPerfil({
                ...perfil, 
                [e.target.name] : e.target.value})} />
             
            </div>

            <div className="my-3">
              <label 
              className="uppercase font-bold text-gray-600"
                name="web"
                value={perfil.web || ''} 
                onChange={ e => setPerfil({
                  ...perfil, 
                  [e.target.name] : e.target.value})}>Web Site</label>
              <input 
              type="text" 
              className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
              name="web"
              value={perfil.web || ''} 
              onChange={ e => setPerfil({
                ...perfil, 
                [e.target.name] : e.target.value})}
              />
             
            </div>

            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">Phone Number</label>
              <input 
              type="text" 
              className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
              name="telefono"
              value={perfil.telefono || ''} 
              onChange={ e => setPerfil({
                ...perfil, 
                [e.target.name] : e.target.value})}
              />
            </div>

            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">Email</label>
              <input 
              type="text" 
              className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
              name="email"
              value={perfil.email || ''} 
              onChange={ e => setPerfil({
                ...perfil, 
                [e.target.name] : e.target.value})}
              />
             
            </div>
            <input
              type="submit"
              value="Save Changes"
              className="bg-indigo-600 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 hover:cursor-pointer"
              >
            </input>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditProfile