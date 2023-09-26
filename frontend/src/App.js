
import { Fragment, useEffect } from 'react';
import './App.css';
import Header from "./component/layout/Header/header.js"
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/footer"
import Home from './component/Home/Home';
import ProductDetails from"./component/Product/ProductDetails.js"
import Products from './component/Products/Products.js';
import Search from "./component/Products/Search.js"
import LoginSignUpM from './component/User/LoginSignUpM';
import store from "./store";
import { meUserDetails } from './actions/userAction';

import { useSelector } from 'react-redux';
import UserDetailsFun from './component/Home/UserDetailsFun';
import Loader from './component/layout/Loader/Loading';
import ProfileUser from './component/User/ProfileUser';
import ProtectedRoute from './component/Route/ProtectedRoute';
import ProfileUserUpdate from './component/User/ProfileUserUpdate';
import PasswordUserUpdate from './component/User/PasswordUserUpdate';
import PasswordReset from './component/User/PasswordReset';
import PasswordResetEmail from './component/User/PasswordResetEmail';
import Cart from './component/Home/Cart/Cart';
import Shipping from './component/Home/Cart/Shipping';
function App() {
  const {isAuthenticated,loading,userFetched}=useSelector(state=>state.user);
 
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto"],
      },
    });
store.dispatch(meUserDetails());
   
  }, []);
  return (
  <Fragment>
    {
      loading?<Loader/>: <Router>
      <Header />
      {isAuthenticated && <UserDetailsFun user={userFetched}/>}
      <Routes>
      <Route path="/" element={<Home/>} ></Route>
      <Route path='/product/:id' element={<ProductDetails/>}></Route>
      <Route path='/products' element={<Products/>}></Route>
      <Route path='/products/:keyword' element={<Products/>}></Route>
      <Route path='/search' element={<Search/>}></Route>
      <Route path='/login' element={<LoginSignUpM/>}></Route>
      
      <Route exact path="/" element={ <ProtectedRoute /> } >
    <Route exact path="/account" element={ <ProfileUser /> } />
</Route>
<Route exact path="/me/update" element={ <ProtectedRoute /> } >
    <Route exact path="/me/update" element={ <ProfileUserUpdate /> } />
</Route>
<Route exact path="/password/update" element={ <ProtectedRoute /> } >
    <Route exact path="/password/update" element={ <PasswordUserUpdate /> } />
</Route>
<Route path='/reset/password' element={<PasswordReset/>}></Route>
<Route path='/reset/forgot/:token' element={<PasswordResetEmail/>}></Route>
<Route path='/cart' element={<Cart/>}></Route>
<Route exact path="/login/shipping" element={ <ProtectedRoute /> } >
    <Route exact path="/login/shipping" element={ <Shipping /> } />
</Route>


      </Routes>

      
      <Footer/>
    </Router>
    }
  </Fragment>
  );
}

export default App;
