import React from 'react'

import './Footer.css'
import logo from '../images/DigiTastik_logo.png'
import { Redirect } from 'react-router-dom'

function Footer() {
    return (
        <div className="footer">
            <a href="http://www.digitastik.com"><img src={logo} alt="Digitastik Marketing Solutions Logo"/></a>
            <h4>Powered by Digitastik<br/>Marketing Solutions</h4>
        </div>
    )
}

export default Footer
