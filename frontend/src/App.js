
import { useEffect } from 'react';
import './App.css';
import Header from "./component/layout/Header/header.js"
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/footer"
import Home from './component/Home/Home';
function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

   
  }, []);
  return (
   <Router>
      <Header />
      <Routes>
      <Route path="/" element={<Home/>} ></Route>
      </Routes>
      
      <Footer/>
    </Router>
  );
}

export default App;
