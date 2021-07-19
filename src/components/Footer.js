import React from 'react'

import './Footer.css'
import logo from '../DigiTastik_logo.png'

function Footer() {
    return (
        <div className="footer">
            <img src={logo} alt="Digitastik Marketing Solutions Logo"/>
            <h4>Powered by Digitastik<br/>Marketing Solutions</h4>
        </div>
    )
}

export default Footer
