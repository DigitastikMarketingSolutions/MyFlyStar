import React, { useEffect, useState } from 'react'
import './SearchTickets.css'
import axios from '../axios'
import {Button, Modal} from '@material-ui/core'
import { useStateValue } from '../data/StateProvider'


function SearchTickets() {
    const [state] = useStateValue()
    const [tickets, setTickets] = useState([]);
    const [firstOpen, setFirstOpen] = useState(false)
    const [secondOpen, setSecondOpen] = useState(false)
    const [ticket, setTicket] = useState({})

  useEffect(() => {
    axios({
      method: "get",
      url: "api/tickets",
      headers: {"Access-Control-Allow-Origin": "*"}
    })
      .then((res) => {
        setTickets(res.data);
      })
      .catch((err) => console.error(err));
  }, [setTickets]);

  return (
    <div className="searchTickets">
        <h2 className="searchTickets__title">All Users</h2>
        {console.log(tickets)}
        {tickets.length
            ? tickets.sort((a, b) => a?.departure - b?.departure).map((item) => {
                return (
                    <div key={item?._id} className="searchTickets__ticket">
                        <span>
                          <b>Airlines</b><br/>{item.airline ? state.flights[item.airline][0] : null}
                        </span>
                        <span>
                          <b>Flight No.</b><br/>{item?.flightNo}
                        </span>
                        <span>
                          <b>PNR</b><br/>{item?.pnr}
                        </span>
                        <span>
                          <b>Date</b><br/>{new Date(item?.departure).toLocaleDateString('en-GB')}
                        </span>
                        <span>
                          <b>Sector</b><br/>{item?.from+" / "+item?.to}
                        </span>
                        <Button variant="outlined" color="default" onClick={() => {
                            setTicket(item)
                            setFirstOpen(true);
                        }}>
                          View
                        </Button>
                        <Modal open={firstOpen} onClose={() => {
                            setFirstOpen(false);
                            setTicket({});
                        }}>
                            <div className="searchTickets__modal">
                                <div className="searchTickets__modal__header">
                                    <img src={ticket.airline ? state.flights[ticket.airline][1] : null} alt="" />
                                    <h1>{ticket.airline ? state.flights[ticket?.airline][0] : null}</h1>
                                </div>
                                <div className="searchTickets__modal__body">
                                    <div className="searchTickets__modal__body__left">
                                        <span>Flight No.: {ticket?.flightNo}</span>
                                        <span>PNR: {ticket?.pnr}</span>
                                        <span>No. of Stops: {ticket?.stops===0 ? 'Non-Stop' : ticket.stops===1 ? 'One-Stop' : 'Two-Stop'}</span>
                                        <span>Available Tickets: {ticket?.noOfTickets}</span>
                                    </div>
                                    <div className="searchTickets__modal__body__right">
                                        <span>Sector: {ticket?.from+" / "+ticket.to}</span>
                                        <span>Departure: {new Date(ticket?.departure).toLocaleDateString('en-GB')}&nbsp;&nbsp;&nbsp;&nbsp;<u>{new Date(ticket?.departure).toLocaleTimeString('en-US',{hour12: false}).slice(0,5)}</u></span>
                                        <span>Arrival: {new Date(ticket?.arrival).toLocaleDateString('en-GB')}&nbsp;&nbsp;&nbsp;&nbsp;<u>{new Date(ticket?.arrival).toLocaleTimeString('en-US',{hour12: false}).slice(0,5)}</u></span>
                                        <span>Price: Rs. {ticket?.price}</span>
                                    </div>
                                </div>
                                <Button variant="contained" color="secondary" onClick={() => setSecondOpen(true)} >
                                    Delete Ticket
                                </Button>
                                <Modal open={secondOpen} onClose={() => setSecondOpen(false)}>
                                    <div className="searchTickets__modal">
                                        <p>Are you sure you want to delete this ticket? {ticket?.bookings?.length ? `This ticket already has ${ticket?.bookings.length} bookings.` : ''}</p>
                                        <div className="searchTickets__modal__buttons">
                                        <Button variant="contained" color="primary" onClick={() => setSecondOpen(false)} >
                                            No, Go Back
                                        </Button>
                                        <Button variant="contained" color="secondary" onClick={() => console.log("Ticket Delete!")} >
                                            Yes, Delete
                                        </Button>
                                        </div>
                                    </div>
                                </Modal>
                            </div>
                        </Modal>
                    </div>
                );
            })
        : "No tickets yet"}
    </div>
  );
}

export default SearchTickets
