import React, { useState } from "react";
import "./BookingPage.css";
import bgImage from "../images/Background1.png";
import axios from '../axios'
import { Button, TextField } from "@material-ui/core";
import { useStateValue } from "../data/StateProvider";
import { useHistory } from "react-router-dom";
import {customAlphabet} from 'nanoid';
import { auth } from "../Firebase";

function BookingPage(props) {
  const history = useHistory();
  const [state, dispatch] = useStateValue();
  const [ adults, child, infants ] = state.ticket.passengers;
  const [_adults, setAdults] = useState(new Array(adults).fill(""));
  const [_child, setChild] = useState(new Array(child).fill(""));
  const [_infants, setInfants] = useState(new Array(infants).fill(""));
  const [markup, setMarkup] = useState(0);
  console.log(adults, child, infants);

  const handleAdultsChange = (e, idx) => {
    setAdults((curr) => {
      let newAdults = curr.slice();
      newAdults[idx] = e.target.value;
      console.log(newAdults);
      return newAdults;
    });
    console.log(_adults);
  };

  const handleChildChange = (e, idx) => {
    setChild((curr) => {
      let newChild = curr.slice();
      newChild[idx] = e.target.value;
      console.log(newChild);
      return newChild;
    });
  };

  const handleInfantsChange = (e, idx) => {
    setInfants((curr) => {
      let newInfants = curr.slice();
      newInfants[idx] = e.target.value;
      console.log(newInfants);
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
        {new Array(adults).fill(0).map((item, idx) => {
          return (
            <div key={idx} className="booking__section__inputs">
              <span>{idx + 1}.</span>
              <TextField
                type="text"
                variant="filled"
                value={_adults[idx]}
                onChange={(e) => handleAdultsChange(e, idx)}
              />
            </div>
          );
        })}
        {_child.length ? (
          <h1 className="booking__section__subtitle">Children</h1>
        ) : null}
        {new Array(child).fill(0).map((item, idx) => (
          <div key={idx} className="booking__section__inputs">
            <span>{idx + 1}.</span>
            <TextField
              type="text"
              variant="filled"
              value={_child[idx]}
              onChange={(e) => handleChildChange(e, idx)}
            />
          </div>
        ))}
        {_infants.length ? (
          <h1 className="booking__section__subtitle">Infants</h1>
        ) : null}
        {new Array(infants).fill(0).map((item, idx) => {
          return (
            <div key={idx} className="booking__section__inputs">
              <span>{idx + 1}.</span>
              <TextField
                type="text"
                variant="filled"
                value={_infants[idx]}
                onChange={(e) => handleInfantsChange(e, idx)}
              />
            </div>
          );
        })}
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
          <span className="booking__markup__info">
            *This amount will be added to the final fare price
          </span>
        </div>
        <Button
          disabled={_adults.includes("") || _child.includes("") || _infants.includes("")}
          className="booking__section__button"
          variant="contained"
          color="primary"
          onClick={() => {
            const price = (parseInt(state.ticket.price) * (adults+child)) + (1500 * infants)
            const passengers = []
            if(_adults){
              passengers.push(..._adults)
            }
            if(_child){
              passengers.push(..._child)
            }
            if(_infants){
              passengers.push(..._infants)
            }
            const id1 = customAlphabet('BCDFGHJKLMNPQRSTVWXYZ', 3)()
            const id2 = customAlphabet('0123456789', 5)()
            const date = Date.now()
            dispatch({
              type: 'SET_TICKET',
              ticket: {...state.ticket, bookingId: id1+'-'+id2, bookingDate: date}
            })
            const data = {
              email: state.user.email,
              flightNo: state.ticket.flightNo,
              pnr: state.ticket.pnr,
              adults: _adults,
              children: _child,
              infants: _infants,
              price: price + parseInt(markup),
              bookingId: id1+'-'+id2,
              bookingDate: date,
            }
            axios({
              method: 'post',
              url:'api/bookings/',
              data
            }).then(_ => {
              axios({
                method: 'patch',
                url:`api/tickets?pnr=${state.ticket.pnr}`,
                data: {
                  bookingId: id1+'-'+id2,
                  bookingDate: date
                }
              }).then(res => {
                axios({
                  method:'patch',
                  url: `api/users?type=balanceDeduct&email=${state.user?.email}&amount=${price}`
                }).then(response => {
                  dispatch({
                    type: "SET_USER",
                    user: {...state.user, balance: state.user.balance-price}
                  })
                  history.push("/booked");
                })
              })
              
            })
          }}
        >
          BOOK
        </Button>
      </div>
    </div>
  );
}

export default BookingPage;
