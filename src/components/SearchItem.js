import { Button, Card } from "@material-ui/core";
import fire from "../images/fire.svg"
import React from "react";

import "./SearchItem.css";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../data/StateProvider";

function SearchItem(props) {
  const history = useHistory();
  const [state, dispatch] = useStateValue();

  const { flightNo, airline, from, to, stops, departure, arrival, passengers, price, noOfTickets, hotDeal } = props;
  const depDate = new Date(departure);
  const arrDate = new Date(arrival);

  return (
    <Card className="searchItem" elevation={12}>
      <img className="searchItem__image" src={state.flights[airline][1]} alt="" />
      <p className="searchItem__details">
        <span>{flightNo}</span>
        <span>
          {from} / {to}
        </span>
        <span>{stops===0 ? "Non-Stop" : stops===1 ? "One-Stop" : "Two-Stop"}</span>
        <span>
          {depDate.toISOString().slice(8,10)}-{depDate.toISOString().slice(5,7)}-{depDate.toISOString().slice(0,4)}
        </span>
        <span>
          {depDate.toLocaleTimeString('en-US', {hour12: false}).slice(0,5)} / {arrDate.toLocaleTimeString('en-US', {hour12: false}).slice(0,5)}
        </span>
        <span>{price}</span>
        <span>{noOfTickets<6 ? noOfTickets : '5+'}</span>
      </p>
      <Button
        onClick={() => {
          if(state.user?.balance < price*(passengers[0]+passengers[1])+1500*passengers[2]){
            alert('Insufficient Balance.')
          } else if(passengers[0]+passengers[1]+passengers[2]>noOfTickets){
            alert(`Not enough available tickets. Book ${noOfTickets} for now and contact us for more.`)
          } else {            
            dispatch({
              type: "SET_TICKET",
              ticket: {
                ...props
              },
            });
            sessionStorage.setItem('ticket', JSON.stringify(props))
            history.push('/booking');
          }
        }}
        className="searchItem__button"
        variant="contained"
        color="primary"
      >
        Book
      </Button>
      {!!hotDeal ? <img src={fire} alt=""/> : null}
    </Card>
  );
}

export default SearchItem;
