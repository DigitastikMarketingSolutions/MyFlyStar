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
                    <div className="payment__section__content__qr">
                        <h1>UPI Details</h1>
                        <img src={qrCode} alt=""/>
                        <div>
                            <span>Scan QR to pay with UPI</span>
                            <br/>
                            <span><b><u>myflystar@icici</u></b></span>
                            <br/>
                            <span><b><u>shubhajit123@icici</u></b></span>
                            <br/>
                            <span>Phone No.: +91 81160 67327</span>
                        </div>
                    </div>
                    <div className="payment__section__content__details">
                        <h1>Bank Details</h1>
                        <span>Account Name: SUBHAJIT SAHA</span>
                        <span>Account No.: 160905005140</span>
                        <span>IFSC Code: ICIC0001609</span>
                        <span>MICR Code: 736229501</span>
                        <span>Branch Name: DINHATA, WEST BENGAL</span>
                        <br/>
                        <span>Account Name: SUBHAJIT SAHA</span>
                        <span>Account No.: 36110458142</span>
                        <span>IFSC Code: SBIN0015949</span>
                        <span>MICR Code: 736002152</span>
                        <span>Branch Name: DINHATA TOWN</span>
                    </div>
                    
                </div>
            </div>
            
            
            
            
        </div>
    )
}

export default PaymentsPage
