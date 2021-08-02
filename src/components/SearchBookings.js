import React, { useEffect, useState } from 'react'
import './SearchBookings.css'
import axios from '../axios'
import { useStateValue } from '../data/StateProvider';
import { Button, Modal } from '@material-ui/core';

function SearchBookings() {
    const [state] = useStateValue()
    const [bookings, setBookings] = useState([]);
    

  useEffect(() => {
    axios({
      method: "get",
      url: "api/bookings",
      headers: {"Access-Control-Allow-Origin": "*"}
    })
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => console.error(err));
  }, [setBookings]);

  return (
    <div className="searchBookings">
      <h2 className="searchBookings__title">All Users</h2>
      {console.log(bookings)}
      {bookings?.length
        ? bookings.map((item) => <SearchBookingsListItem item={item}/>)
        : "No users yet"}
      
    </div>
  );
}

export default SearchBookings

const SearchBookingsListItem = (props) => {
    const {item} = props;
    const [state] = useStateValue();
    const [user, setUser] = useState({})
    const [ticket, setTicket] = useState({});
    const [booking, setBooking] = useState({});
    const [open, setOpen] = useState(false);

    useEffect(() => {
        axios({
            method:'get',
            url: `api/users?email=${item.email}`,
            headers: {'Allow-Control-Access-Origin': "*"}
        }).then(res => setUser(res.data)).catch(err => console.error(err))

        axios({
            method:'get',
            url: `api/tickets?id=${item.ticketId}&type=booked`,
            headers: {'Allow-Control-Access-Origin': "*"}
        }).then(res => setTicket(res.data)).catch(err => console.error(err))
    }, [item.email, item.ticketId])
    return (
        <div key={item?._id} className="searchBookings__booking">
            <span>
              <b>Agent Name</b><br/>{user?.name}
            </span>
            <span>
              <b>Agency Name</b><br/>{user?.company}
            </span>
            <span>
              <b>Booking Date</b><br/>{item?.bookingDate ? new Date(item?.bookingDate).toLocaleDateString('en-GB') : null}
            </span>
            <span>
              <b>Booking Id</b><br/>{item?.bookingId}
            </span>
            <span>
              <b>PNR</b><br/>{item?.pnr}
            </span>
            <Button variant="outlined" color="default" onClick={() => {
                setBooking(item)
                setOpen(true);
            }}>
                View
            </Button>
            <Modal open={open} onClose={() => {
                setOpen(false);
                setBooking({});
            }}>
                <div className="searchBookings__modal">
                    <div className="searchBookings__modal__header">
                        <span>Airline: {ticket.airline ? state.flights[ticket?.airline][0] : null}</span>
                        <span>FlightNo: {booking?.flightNo}</span>
                        <span>PNR: {booking?.pnr}</span>
                        <span>Sector: {ticket?.from+" / "+ticket?.to}</span>
                    </div>
                    <div className="searchBookings__modal__header">
                        <span>Departure: {new Date(ticket?.departure).toLocaleDateString('en-GB')}&nbsp;&nbsp;&nbsp;&nbsp;<u>{new Date(ticket?.departure).toLocaleTimeString('en-US',{hour12: false}).slice(0,5)}</u></span>
                        <span>Arrival: {new Date(ticket?.arrival).toLocaleDateString('en-GB')}&nbsp;&nbsp;&nbsp;&nbsp;<u>{new Date(ticket?.arrival).toLocaleTimeString('en-US',{hour12: false}).slice(0,5)}</u></span>
                        <span>Total Price(with markup): {booking?.price}</span>
                    </div>
                    <div className="searchBookings__modal__header">
                        <h3>Passenger Details</h3>
                        {booking?.adults?.map((i, idx) => {
                            return(
                                <div key={idx} className="searchBookings__modal__header__row">
                                  <span>{i}</span>
                                  <span>Adult</span>
                                </div>
                            )
                        })}
                        {booking?.children?.map((i, idx) => {
                            return(
                                <div key={idx} className="searchBookings__modal__header__row">
                                  <span>{i}</span>
                                  <span>Child</span>
                                </div>
                            )
                        })}
                        {booking?.infants?.map((i, idx) => {
                            return(
                                <div key={idx} className="searchBookings__modal__header__row">
                                  <span>{i}</span>
                                  <span>Infants</span>
                                </div>
                            )
                        })}
                    </div>
                
                </div>
            </Modal>
        </div>
      )
}