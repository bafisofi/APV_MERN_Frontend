import PacientesContext from "../context/PacientesProvider"
import usePacientes from "../hooks/usePacientes"
import Patient from "./Patient"

const ListingPatients = () => {
  const {pacientes} = usePacientes()
 
  return (
    <> 
     {pacientes.length ? (
      <>
        <h2 className="font-black text-3xl text-center">Patients Listing</h2>
        <p className="text-xl mt-5 mb-10 text-center">
        Manage your {''}
        <span className="text-indigo-600 font-bold">Patients and Appointments</span>
        </p>

        {pacientes.map(paciente =>(
          <Patient
            key ={paciente._id}
            paciente ={paciente}
          />
        ))}
      </>
     ) : (
      <>
        <h2 className="font-black text-3xl text-center">There are no patients</h2>
        <p className="text-xl mt-5 mb-10 text-center">
        Start adding patients {''}
        <span className="text-indigo-600 font-bold">and they will appear in this place</span>
        </p>
      </>
     )}
    </>
  )
}

export default ListingPatients