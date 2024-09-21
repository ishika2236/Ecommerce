
import Signup from './Components/Auth/Signup'
import OtpVerification from './Components/Auth/OtpVerification'
import Home from './Components/Home'
import {Route, Routes} from 'react-router-dom'
import AddProduct from './Components/Product/AddProduct'
import EditProduct from './Components/Product/EditProduct'
import LoginIn from './Components/Auth/LoginIn'
import VerifyLoginOTP from './Components/Auth/VerifyLoginOTP'
import { ShowProduct } from './Components/Product/ShowProduct'
import Cart from './Components/Cart/Cart'
import Profile from './Components/Profle/Profile'
import { ListedProduct } from './Components/Product/ListedProduct'
import Navbar from './Navbar'
import './App.css'

function App() {

  return (

    <>
    <Navbar/>
    <Routes>
    <Route path="/auth/register" element={<Signup />} />
    <Route path='/auth/verify-otp' element={<OtpVerification/>}></Route>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/product/add' element={<AddProduct/>}></Route>
    <Route path="/products/edit/:id" element={<EditProduct />} />
    <Route path="/auth/login" element={<LoginIn />} />
    <Route path="/auth/verify-login-otp" element={<VerifyLoginOTP/>}></Route>
    <Route path='/products' element={<ShowProduct/>}></Route>
    <Route path='/cart' element={<Cart/>}></Route>
    <Route path='/profile' element={<Profile/>}></Route>
    <Route path='/myListedProducts' element={<ListedProduct/>}></Route>

    </Routes>
      
    </>
  )
}

export default App
