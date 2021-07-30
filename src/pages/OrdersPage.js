import React, { useEffect, useState } from 'react'
import './OrdersPage.css'
import bgImage from "../images/Background1.png";
import axios from '../axios'
import { auth } from '../Firebase';

function OrdersPage() {
    const [bookings, setBookings] = useState([])
    useEffect(() => {
        axios({
            method: 'get',
            url: `api/bookings?email=${auth.currentUser?.email}`
        }).then(res => setBookings(res.data))
        .catch(err => console.error(err))
    })
    return (
        <div className="orders">
            <div className="orders__bgImage">
              <img src={bgImage} alt="" />
            </div>
            <div className="orders__section" >
                <h1 className="orders__title">
                    Your Orders
                </h1>
                <table>
                <tbody>
                {bookings.length===0 ? (<tr><th>Oops! Looks like you have no previous bookings with us!</th></tr>) : (
                    <tr className="orders__items">
                        <th>S.No.</th>
                        <th>Booking ID</th>
                        <th>Booking Date</th>
                        <th>Flight No.</th>
                        <th>PNR</th>
                        <th>Amount (in INR)</th>
                    </tr>
                )}
                {
                    bookings.map((item, idx) => {
                        let date = new Date(item.bookingDate).toISOString()
                        return (
                            <tr className="orders__items" key={item.bookingId}>
                                <td>{idx+1}.</td>
                                <td>{item.bookingId}</td>
                                <td>{date.slice(8,10)+'-'+date.slice(5,7)+'-'+date.slice(0,4)}</td>
                                <td>{item.flightNo}</td>
                                <td>{item.pnr}</td>
                                <td>Rs. {item.price}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrdersPage
