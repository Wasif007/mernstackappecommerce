
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
function App() {
  const {isAuthenticated,loading,userFetched}=useSelector(state=>state.user);
 
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
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

      </Routes>

      
      <Footer/>
    </Router>
    }
  </Fragment>
  );
}

export default App;
