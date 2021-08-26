import React, { useState } from "react";
import "./BookingPage.css";
import bgImage from "../images/Background1.png";
import axios from "../axios";
import {
  Button,
  Modal,
  TextField,
  CircularProgress
} from "@material-ui/core";
import { useStateValue } from "../data/StateProvider";
import { useHistory } from "react-router-dom";
import { customAlphabet } from "nanoid";
import { auth } from "../Firebase";
import BookingFormListItem from "../components/BookingFormListItem";

function BookingPage() {
  const ticket = JSON.parse(sessionStorage.getItem("ticket"));
  const history = useHistory();
  const [state, dispatch] = useStateValue();
  const [adults, child, infants] = ticket.passengers;
  const [_adults, setAdults] = useState(new Array(adults).fill(""));
  const [_child, setChild] = useState(new Array(child).fill(""));
  const [_infants, setInfants] = useState(new Array(infants).fill(""));
  const [markup, setMarkup] = useState(0);
  const [modalOpen, setModalOpen] = useState(false)
  const [modal2Open, setModal2Open] = useState(false)

  const handleAdultsChange = (i) => (text) => {
    setAdults((curr) => {
      let newAdults = [...curr];
      newAdults[i] = text;
      return newAdults;
    });
  };

  const handleChildChange = (i) => (text) => {
    setChild((curr) => {
      let newChild = [...curr];
      newChild[i] = text;
      return newChild;
    });
  };

  const handleInfantsChange = (i) => (text) => {
    setInfants((curr) => {
      let newInfants = [...curr];
      newInfants[i] = text;
      return newInfants;
    });
  };

  const handleMarkupChange = (e) => {
    setMarkup(e.target.value);
  };

  return (
    <div className="booking">
      <div className="booking__bgImage">
        <img src={bgImage} alt="" />
      </div>
      <div className="booking__section">
        <h1 className="booking__section__title">Passenger Details</h1>
        {_adults.length ? (
          <h1 className="booking__section__subtitle">Adults</h1>
        ) : null}
        {new Array(adults).fill(0).map((item, i) => (
          <BookingFormListItem key={customAlphabet('abcdefghijkl',10)+i} idx={i} handleCallback={handleAdultsChange(i)} />
        ))}
        {_child.length ? (
          <h1 className="booking__section__subtitle">Children</h1>
        ) : null}
        {new Array(child).fill(0).map((item, i) => (
          <BookingFormListItem key={customAlphabet('abcdefghijkl',10)+i} idx={i} handleCallback={handleChildChange(i)} />
        ))}
        {_infants.length ? (
          <h1 className="booking__section__subtitle">Infants</h1>
        ) : null}
        {new Array(infants).fill(0).map((item, i) => (
          <BookingFormListItem
            key={customAlphabet('abcdefghijkl',10)+i}
            idx={i}
            handleCallback={handleInfantsChange(i)}
          />
        ))}
        <div className="booking__markup booking__section__inputs">
          <h3 className="booking__markup__title">Enter Markup</h3>
          <TextField
            className="booking__markup__textfield"
            label="Enter amount"
            size="small"
            type="text"
            value={markup}
            onChange={handleMarkupChange}
            variant="filled"
          />
          <h3 className="booking__markup__title">
            Billing Price:{parseInt(ticket.price) * (adults + child) + 1500 * infants}
          </h3>
          <h3 className="booking__markup__title">
            Display Fare:{parseInt(ticket.price) * (adults + child) + 1500 * infants + (parseInt(markup) ? parseInt(markup) : 0)}
          </h3>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            disabled={
              _adults.includes("") ||
              _child.includes("") ||
              _infants.includes("")
            }
            variant="contained"
            color="primary"
            className="booking__section__button"
            onClick={() => setModalOpen(true)}
          >
            BOOK
          </Button>
          <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
            <div className="booking__modal">
              <p>Are you sure? No changes can be made further.</p>
              <div>
                <Button 
                  className="booking__modal__button"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setModal2Open(true)
                    const price =
                      parseInt(ticket.price) * (adults + child) + 1500 * infants;
                    const id1 = customAlphabet("BCDFGHJKLMNPQRSTVWXYZ", 3)();
                    const id2 = customAlphabet("0123456789", 5)();
                    const date = Date.now();
                    dispatch({
                      type: "SET_TICKET",
                      ticket: {
                        ...state.ticket,
                        bookingId: id1 + "-" + id2,
                        bookingDate: date,
                      },
                    });
                    ticket.adults = _adults;
                    ticket.children = _child;
                    ticket.infants = _infants;
                    ticket.bookingId = id1 + "-" + id2
                    ticket.bookingDate = date
                    sessionStorage.setItem("ticket", JSON.stringify(ticket));
                    const data = {
                      email: state.user.email,
                      ticketId: ticket._id,
                      flightNo: ticket.flightNo,
                      pnr: ticket.pnr,
                      journeyDate: ticket.departure,
                      adults: _adults,
                      children: _child,
                      infants: _infants,
                      price: price + parseInt(markup),
                      realPrice: price,
                      bookingId: id1 + "-" + id2,
                      bookingDate: date,
                    };
                    axios({
                      method: "post",
                      url: "api/bookings/",
                      data,
                      headers: {'Access-Control-Allow-Origin': '*'}
                    }).then((_) => {
                      axios({
                        method: "patch",
                        url: `api/tickets?id=${ticket._id}&qty=${adults+child+infants}&bid=${id1 + "-" + id2}&type=booking`,
                        headers: {'Access-Control-Allow-Origin': '*'}
                      }).then( __ => {
                        axios({
                          method: "patch",
                          url: `api/users?type=balanceDeduct&email=${auth.currentUser?.email}&amount=${price}`,
                          headers: {'Access-Control-Allow-Origin': '*'}
                        }).then( ___ => {
                          dispatch({
                            type: "SET_USER",
                            user: {
                              ...state.user,
                              balance: state.user.balance - price,
                            },
                          });
                          history.push("/booked");
                        });
                      });
                    });
                  }}
                >
                  Yes, Book Now
                </Button>
                <Modal open={modal2Open} onClose={() => setModal2Open(false)}>
                  <div className="booking__modal">
                      <CircularProgress/>
                      <h3>Your payment is being processed ...<br/>Please do not refresh or go back.</h3>
                  </div>
                </Modal>
                <Button
                  className="booking__modal__button"
                  variant="contained"
                  color="secondary"
                  onClick={() => setModalOpen(false)}
                >
                  No, Go Back
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
