import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import axios from "../axios";
import Logo from '../images/Logo.png'
import { useStateValue } from "../data/StateProvider";
import { auth } from "../Firebase";
import "./BookedPage.css";
import { useReactToPrint } from 'react-to-print'
import { useHistory } from "react-router-dom";

function BookedPage(props) {
  const [state, dispatch] = useStateValue()
  const history = useHistory()
  const {
    airline,
    arrival,
    departure,
    flightNo,
    from,
    pnr,
    stops,
    to,
    bookingId,
    bookingDate
  } = state.ticket;
  const dep = (new Date(departure)).toISOString()
  const arr = (new Date(arrival)).toISOString()
  const [user, setUser] = useState({});
  const [booking, setBooking] = useState({})
  const ticketRef = useRef();
  const [adults, setAdults] = useState([]);
  const [child, setChild] = useState([]);
  const [infants, setInfants] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: `api/users/${auth.currentUser?.email}`,
    })
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));

      axios({
        method: "get",
        url: `api/bookings?bid=${bookingId}`,
      })
        .then((res) => {
          console.log(res.data)
          setBooking(res.data)
          setAdults(res.data.adults)
          setChild(res.data.children)
          setInfants(res.data.infants)
        })
        .catch((err) => console.error(err));

  }, [setUser, bookingId]);

  const date = new Date(bookingDate).toISOString()

  const handlePrint = useReactToPrint({
    content: () => ticketRef.current,
    documentTitle: "Ticket "+booking.bookingId
  })

  return (
    <div className="booked">
      <div ref={ticketRef} className="booked__ticket">
        <div className="booked__ticket__header">
        <div className="header__links" to="/">
          <img className="header__logo__image" src={Logo} alt="" />
          <h1>MyFlyStar</h1>
        </div>
          <div classname="booked__ticket__header__bookedDetails">
            <span className="booked__ticket__header__company">
              {user.company}
            </span>
            <br/>
            <span>Booking Id: {booking.bookingId}</span>
            <br/>
            <span>Booked on: {date.slice(8,10)+'-'+date.slice(5,7)+'-'+date.slice(0,4)}</span>
          </div>
        </div>
        <hr />
        <hr />
        <div className="booked__ticket__intro">
          <img
            className="booked__ticket__intro__airlineImage"
            src={state.flights[airline][1]}
            alt=""
          />
          <span className="booked__ticket__intro__airlineName">{state.flights[airline][0]}</span>
          <div className="booked__ticket__intro__pnr">
            <span className="booked__ticket__intro__pnr__title">
              Airline PNR:
            </span>
            <span className="booked__ticket__intro__pnr__value">{pnr}</span>
          </div>
        </div>
        <div className="booked__ticket__flight">
            <div className="booked__ticket__flight__title">
                <span>Flight Details</span>
                <span>* Please verify flight times with the airlines prior to departure</span>
            </div>
            <table className="booked__ticket__flight__table">
                <tr className="booked__ticket__flight__row">
                    <th>Flight</th>
                    <th>Departure</th>
                    <th>Arrival</th>
                    <th>Stops</th>
                </tr>
                <tr>
                    <td>{state.flights[airline][0]}</td>
                    <td>{from}</td>
                    <td>{to}</td>
                    <td>{stops ? stops : "Non-Stop"}</td>
                </tr>
                <tr>
                    <td>{flightNo}</td>
                    <td>{dep.slice(0,10)}<br/>{dep.slice(11,16)}</td>
                    <td>{arr.slice(0,10)}<br/>{arr.slice(11,16)}</td>                  
                </tr>
            </table>
        </div>
        <div className="booked__ticket__passengers">
            <div className="booked__ticket__passengers__title">
                <span>Passenger(s) Details</span>
            </div>
            <table className="booked__ticket__passengers__table">
                <tr className="booked__ticket__passengers__row">
                    <th>S.No.</th>
                    <th>Passenger Name</th>
                    <th>Type</th>
                </tr>
                {adults.map((i, idx) => (
                  <tr key={idx} className="booked__ticket__passengers__row">
                    <td>{idx+1}.</td>
                    <td>{i}</td>
                    <td>Adult</td>
                  </tr>
                ))}
                {child.map((i, idx) => (
                  <tr key={idx} className="booked__ticket__passengers__row">
                    <td>{idx+1}.</td>
                    <td>{i}</td>
                    <td>Child</td>
                  </tr>
                ))}
                {infants.map((i, idx) => (
                  <tr key={idx} className="booked__ticket__passengers__row">
                    <td>{idx+1}.</td>
                    <td>{i}</td>
                    <td>Infant</td>
                  </tr>
                ))}
            </table>
        </div>
        <div className="booked__ticket__inclusions">
          <div className="booked__ticket__inclusions__title">
            <span>Passenger(s) Details</span>
          </div>
          <table className="booked__ticket__inclusions__table">
            <tr className="booked__ticket__inclusions__row">
              <th>Baggage</th>
              <th>Adult</th>
              <th>Child</th>
              <th>Infant</th>
            </tr>
            <tr>
              <td>Cabin Baggage</td>
              <td>7kg</td>
              <td>7kg</td>
              <td>0kg</td>
            </tr>
            <tr>
              <td>Check-in Baggage</td>
              <td>15kg</td>
              <td>15kg</td>
              <td>0kg</td>
            </tr>
          </table>
        </div>
        <div className="booked__ticket__price">
        <div className="booked__ticket__price__title">
            <span>Payment Details</span>
            <span>Amount (in INR)</span>
          </div>
          <hr/>
          <div className="booked__ticket__price__row">
            <span>Total Fare</span>
            <span>Rs. {booking.price}</span>
          </div>
        </div>
        <div className="booked__ticket__information">
          1. This ticket is Non Refundable &amp; Non Changeable
          <br/>
          2. All Guests, including children and infants, must present valid identification at check-in.
          <br/>
          3. As per government directives, Web Check-in is mandatory for all passengers before the scheduled departure of their domestic flight. Charges apply.
          <br/>
          4. Check-in begins 3 hours prior to the flight for seat assignment and closes 45 minutes prior to the scheduled departure.
          <br/>
          5. Charged fare is totally agreed between "BUYER &amp; SELLER", any issues related to fares thereafter will not be entertained. 
          <br/>
          6. We are not responsible for any Flight delay/Cancellation from airline's end. Kindly contact the airline at least 24 hrs before to reconfirm your flight details giving reference of Airline PNR Number. For any schedule change, flight cancelled &amp; terminal related issues.
        </div>
      </div>
      <div className="booked__ticket__buttons">
      <Button className="booked__ticket__print" variant="contained" color="primary" onClick={handlePrint}>Print Ticket</Button>
      <Button className="booked__ticket__print" variant="contained" color="secondary" onClick={() => history.push('/')}>Back to Home</Button>
      </div>
    </div>
  );
}

export default BookedPage;
