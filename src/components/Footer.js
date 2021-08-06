import React from 'react'

import './Footer.css'
import logo from '../images/DigiTastik_logo.png'
import {auth} from '../Firebase'


function Footer() {
    return auth.currentUser ? (
        <div className="footer">
            <a href="http://www.digitastik.com"><img src={logo} alt="Digitastik Marketing Solutions Logo"/></a>
            <a href="http://www.digitastik.com"><h4>Powered by Digitastik<br/>Marketing Solutions</h4></a>
        </div>
    ) : (
        <div className="footer">
            <h4>24x7 emergency no.: +91 99336 67969</h4>
        </div>
    )
}

export default Footer
