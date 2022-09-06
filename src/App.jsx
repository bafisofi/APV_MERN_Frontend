import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import ProtectedRoute from './layout/ProtectedRoute';

import Login from './paginas/Login';
import Register from './paginas/Register';
import ForgottenPassword from './paginas/ForgottenPassword';
import ConfirmAccount from './paginas/ConfirmAccount';
import NewPassword from './paginas/NewPassword';
import ManagePatients from './paginas/ManagePatients'
import EditProfile from './paginas/EditProfile'
import ChangePassword from './paginas/ChangePassword'

import  {AuthProvider} from './context/AuthProvider'
import{PacientesProvider} from './context/PacientesProvider'

function App() {

  return (
   <BrowserRouter>
   <AuthProvider>
      <PacientesProvider>
        <Routes>
          <Route path ="/" element ={<AuthLayout />}>
            <Route  index element= {<Login />}/>
            <Route path='register' element ={< Register/>}/>
            <Route path='password-forgotten' element = {<ForgottenPassword/>}/>
            <Route path='password-forgotten/:token' element = {<NewPassword/>}/>
            <Route path='confirm/:id' element = {<ConfirmAccount/>}/>
          </Route>

          <Route path="/admin" element={<ProtectedRoute/>}>
            <Route index element={<ManagePatients/>}/>
            <Route path="profile" element={<EditProfile/>}/>
            <Route path="change-password" element={<ChangePassword/>}/>
          </Route>
         </Routes>
      </PacientesProvider>     
    </AuthProvider>
   </BrowserRouter>
  )
}

export default App
