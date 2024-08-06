
import './App.css'
import Signup from './Components/Auth/Signup'
import OtpVerification from './Components/Auth/OtpVerification'
import Home from './Components/Home'
import {Route, Routes} from 'react-router-dom'
import AddProduct from './Components/Product/AddProduct'
import EditProduct from './Components/Product/EditProduct'
import LoginIn from './Components/Auth/LoginIn'
import VerifyLoginOTP from './Components/Auth/VerifyLoginOTP'

function App() {

  return (

    <>
    <Routes>
    <Route path="/auth/register" element={<Signup />} />
    <Route path='/auth/verify-otp' element={<OtpVerification/>}></Route>
    <Route path='/home' element={<Home/>}></Route>
    <Route path='/product/add' element={<AddProduct/>}></Route>
    <Route path="/products/edit/:id" element={<EditProduct />} />
    <Route path="/auth/login" element={<LoginIn />} />
    <Route path="/auth/verify-login-otp" element={<VerifyLoginOTP/>}></Route>

    </Routes>
      
    </>
  )
}

export default App
