
import './App.css'
import Signup from './Components/Auth/Signup'
import OtpVerification from './Components/Auth/OtpVerification'
import Home from './Components/Home'
import {Route, Routes} from 'react-router-dom'

function App() {

  return (

    <>
    <Routes>
    <Route path="/auth/register" element={<Signup />} />
    <Route path='/auth/verify-otp' element={<OtpVerification/>}></Route>
    <Route path='/home' element={<Home/>}></Route>

    </Routes>
      
    </>
  )
}

export default App
