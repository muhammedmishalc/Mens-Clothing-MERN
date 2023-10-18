import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Homepage from './pages/Homepage';
import Loginpage from './pages/Loginpage';
import Registerpage from './pages/Registerpage';
import Addproduct from './pages/Addproduct';
import Editproduct from './pages/Editproduct';
import Viewoneproduct from './pages/Viewoneproduct';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Editprofile from './pages/Editprofile';
import Payment from './pages/Payment';
function App() {
  return (
    <BrowserRouter><Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path= '/loginpage' element={<Loginpage/>}/>
      <Route path='/registerpage' element={<Registerpage/>}/>
      <Route path='/addproduct' element={<Addproduct/>}/>
      <Route path='/editproduct/:id' element={<Editproduct/>}/>
      <Route path='/viewone/:id' element={<Viewoneproduct/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/editprofile/:id' element={<Editprofile/>}/>
      <Route path='/paymentpage/:totalprice' element={<Payment/>}/> 
    </Routes>
    </BrowserRouter>
  );
}

export default App;
