import React from 'react'
import playStore from "../../../images/playstore.png"
import appStore from "../../../images/Appstore.png"
import "./footer.css";
const footer = () => {
  return (
    <footer id="footer">
    <div className="leftFooter">
      <h4>DOWNLOAD OUR APP</h4>
      <p>Download App for Android and IOS mobile phone</p>
      <img src={playStore} alt="playstore" />
      <img src={appStore} alt="Appstore" />
    </div>

    <div className="midFooter">
      <h1>ECOMMERCE WEBSITE</h1>
      <p>Best Quality at Best Rates</p>

      <p>Copyrights 2023 &copy; Wasif Ateeq</p>
    </div>

    <div className="rightFooter">
      <h4>Follow Us</h4>
      <a href="http://instagram.com/">Instagram</a>
      <a href="http://youtube.com/">Youtube</a>
      <a href="http://instagram.com/">Facebook</a>
    </div>
  </footer>
  )
}

export default footer
