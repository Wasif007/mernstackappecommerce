
import { Fragment, useEffect } from 'react';
import './App.css';
import Header from "./component/layout/Header/header"
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/footer"
import Home from './component/Home/Home';
import ProductDetails from"./component/Product/ProductDetails"
import Products from './component/Products/Products';
import Search from "./component/Products/Search"
import LoginSignUpM from './component/User/LoginSignUpM';
import store from "./store";
import { meUserDetails } from './actions/userAction';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
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
import OrderConfirmSecond from "./component/Home/Cart/OrderConfirmSecond";
import Payment from "./component/Home/Cart/Payment";
import OrderSuccessPla from './component/Home/Cart/OrderSuccessPla';
import MyOrderDetails from "./component/Order/MyOrderDetails";
import MySingleOrderDetails from "./component/Order/MySingleOrderDetails";
import AdminDashboard from "./component/Dashboard/AdminDashboard"
import AdminAllProducts from "./component/Dashboard/AdminAllProducts"
import AdminSingleProductCreate from "./component/Dashboard/AdminSingleProductCreate"
import AdminUpdateProductData from "./component/Dashboard/AdminUpdateProductData"
import AdminAllOrders from './component/Dashboard/AdminAllOrders';
import AdminUpdateOrderData from "./component/Dashboard/AdminUpdateOrderData"
import AdminUserList from "./component/Dashboard/AdminUserList"
import AdminUserUpdate from "./component/Dashboard/AdminUserUpdate"
import AdminReviews from "./component/Dashboard/AdminReviews"
const stripeApiKey="pk_test_51Nv1D2AtWWs18icLllt131w4gMuORKYB4uP19aHQqOhwg2KVagSQtNsocH45XRKCmC7rVRRXq2GB5YOriFrzKxgy00LTseLSYN";


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
<Route exact path="/order/confirm" element={ <ProtectedRoute /> } >
    <Route exact path="/order/confirm" element={ <OrderConfirmSecond /> } />
</Route>

<Route exact path="/payment/process" element={ <ProtectedRoute /> } >
<Route
  path="/payment/process"
  element={
      <Elements stripe={loadStripe(stripeApiKey)}>
        <Payment />
      </Elements>
  }
/>
</Route>

<Route exact path="/success" element={ <ProtectedRoute /> } >
    <Route exact path="/success" element={ <OrderSuccessPla /> } />
</Route>

<Route exact path="/myorder" element={ <ProtectedRoute /> } >
    <Route exact path="/myorder" element={ <MyOrderDetails /> } />
</Route>
      

<Route exact path="/orderdetails/:id" element={ <ProtectedRoute /> } >
    <Route exact path="/orderdetails/:id" element={ <MySingleOrderDetails /> } />
</Route>
<Route exact path="/admin/dashboard" element={ <ProtectedRoute /> } >
    <Route exact path="/admin/dashboard" element={ <AdminDashboard /> } />
</Route>
<Route exact path="/show/all/admin/products" element={ <ProtectedRoute /> } >
    <Route exact path="/show/all/admin/products" element={ <AdminAllProducts /> } />
</Route>

<Route exact path="/admin/new/product" element={ <ProtectedRoute /> } >
    <Route exact path="/admin/new/product" element={ <AdminSingleProductCreate /> } />
</Route>
<Route exact path="/show/admin/product/:id" element={ <ProtectedRoute /> } >
    <Route exact path="/show/admin/product/:id" element={ <AdminUpdateProductData /> } />
</Route>
<Route exact path="/admin/orders" element={ <ProtectedRoute /> } >
    <Route exact path="/admin/orders" element={ <AdminAllOrders /> } />
</Route>
<Route exact path="/admin/order/:id" element={ <ProtectedRoute /> } >
    <Route exact path="/admin/order/:id" element={ <AdminUpdateOrderData /> } />
</Route>
<Route exact path="/admin/allusers" element={ <ProtectedRoute /> } >
    <Route exact path="/admin/allusers" element={ <AdminUserList /> } />
</Route>
<Route exact path="/admin/user/:id" element={ <ProtectedRoute /> } >
    <Route exact path="/admin/user/:id" element={ <AdminUserUpdate /> } />
</Route>
<Route exact path="/admin/reviewslist" element={ <ProtectedRoute /> } >
    <Route exact path="/admin/reviewslist" element={ <AdminReviews /> } />
</Route>

      </Routes>

      
      <Footer/>
    </Router>
    }
  </Fragment>
  );
}

export default App;
