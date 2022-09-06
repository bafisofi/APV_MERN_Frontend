import usePacientes from "../hooks/usePacientes";

const Patient = ({paciente}) => {

  const {setEdicion, eliminarPaciente} = usePacientes()

  const{email, fecha, nombre, propietario, sintomas,_id} =paciente


  const formatearFecha = (fecha)=>{
    const nuevaFecha = new Date(fecha)
    return new Intl.DateTimeFormat('en-EN', {dateStyle:'long'}).format(nuevaFecha)
    
  }

  

  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
      <p className="font-bold uppercase text-indigo-600 my-2">Name: {''}
        <span className="font-normal normal-case text-black">{nombre}</span>
      </p>

      <p className="font-bold uppercase text-indigo-600 my-2">Owner: {''}
        <span className="font-normal normal-case text-black">{propietario}</span>
      </p>

      <p className="font-bold uppercase text-indigo-600 my-2">Owner Email: {''}
        <span className="font-normal normal-case text-black">{email}</span>
      </p>

      <p className="font-bold uppercase text-indigo-600 my-2">Entry Date: {''}
        <span className="font-normal normal-case text-black">{formatearFecha(fecha)}</span>
      </p>

      <p className="font-bold uppercase text-indigo-600">Symptoms: {''}
        <span className="font-normal normal-case text-black">{sintomas}</span>
      </p>

      <div className="flex justify-between my-5">
        <button 
        type="button" 
        className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg"
         onClick={()=>setEdicion(paciente)}>
          Edit
        </button>
        <button 
        type="button" 
        className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg"
        onClick={()=>eliminarPaciente(_id)}>
          Delete
        </button>
      </div>

    </div>
  )
}

export default Patient