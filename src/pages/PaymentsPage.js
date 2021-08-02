import React from 'react'
import './PaymentsPage.css'
import bgImage from '../images/Background1.png'
import qrCode from '../images/qr.png'

function PaymentsPage() {
    return (
        <div className="payment">
            <div className="payment__bgImage">
              <img src={bgImage} alt="" />
            </div>
            <div className="payment__section" >
                <h1 className="payment__section__title">
                    Payment Options
                </h1>
                <div className="payment__section__content">
                    {/* <div hidden={true} className="payment__section__content__qr">
                        <img src={qrCode} alt=""/>
                        <span>Scan QR to pay with UPI</span>
                    </div> */}
                    <div className="payment__section__content__details">
                        {/* <h1>UPI Details</h1>
                        <span>UPI ID: test123@okicici</span>
                        <span>Phone No.: +91 90875 65231</span> */}
                        <h1>Bank Details</h1>
                        <span>Account Name: SUBHAJIT SAHA</span>
                        <span>Account No.: 160905005140</span>
                        <span>IFSC Code: ICIC0001609</span>
                        <span>MICR Code: 736229501</span>
                        <span>Branch Name: DINHATA, WEST BENGAL</span>
                    </div>
                    <div className="payment__section__content__footer">
                        <p>*UPI payment features coming soon...</p>
                    </div>
                </div>
            </div>
            
            
            
            
        </div>
    )
}

export default PaymentsPage
