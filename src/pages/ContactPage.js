import React from 'react'
import './ContactPage.css'
import bgImage from '../images/Background1.png'

function ContactPage() {
    return (
        <div className="contact">
            <div className="contact__bgImage">
              <img src={bgImage} alt="" />
            </div>
            <div className="contact__section" >
                <h1 className="contact__section__title">
                    Contact Us
                </h1>
                <h1 className="contact__section__name">
                    Subhajit Saha
                </h1>
                <div className="contact__section__container__grand">
                    <div className="contact__section__container">
                        <h1 className="contact__section__subtitle">
                            Contact Details:
                        </h1>
                        <span>Phone No.: +91 99336 67969</span>
                        <span>Email: </span>
                        <h1 className="contact__section__subtitle">
                            Office Address:
                        </h1>
                        <span>Sahebganj Road</span>
                        <span>Dinhata, Coochbehar</span>
                    </div>
                    <div className="contact__section__container">
                        <h1 className="contact__section__subtitle">
                            Personal Address:
                        </h1>
                        <span>Bhangni Part-II</span>
                        <span>P.O.: Nigamnagar</span>
                        <span>P.S.: Dinhata</span>
                        <span>District: Coochbehar</span>
                        <span>Pincode: 736169</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactPage
