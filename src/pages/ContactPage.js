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
                        <span>Opp. Gyanadadevi Girls</span>
                        <span>High School, Dinhata</span>
                        <span>Coochbehar. PIN-736135</span>
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
                <p className="contact__section__footer">24x7 emergency no.: +91 99336 67969</p>
                <p className="contact__section__footer">For technical queries: +91 91261 94070</p>
            </div>
        </div>
    )
}

export default ContactPage
