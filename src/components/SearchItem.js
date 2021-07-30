import { Button, Card, Paper } from "@material-ui/core";
import React from "react";

import "./SearchItem.css";
import BookedPage from "../pages/BookedPage";
import logo from "../images/indigo.jpg";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../data/StateProvider";

function SearchItem(props) {
  const history = useHistory();
  const [state, dispatch] = useStateValue();

  const { flightNo, airline, from, to, stops, departure, arrival, passengers, price } = props;
  const depDate = new Date(departure);
  const arrDate = new Date(arrival);
  console.log(depDate.toDateString(), arrDate)

  return (
    <Card className="searchItem" elevation={12}>
      <img className="searchItem__image" src={logo} alt="" />
      <p className="searchItem__details">
        <span>{flightNo}</span>
        <span>
          {from} / {to}
        </span>
        <span>{stops ? stops : "Non-Stop"}</span>
        <span>
          {depDate.toISOString().slice(8,10)}-{depDate.toISOString().slice(5,7)}-{depDate.toISOString().slice(0,4)}
        </span>
        <span>
          {depDate.getHours()}:{depDate.getMinutes()} / {arrDate.getHours()}:
          {arrDate.getMinutes()}
        </span>
        <span>{price}</span>
      </p>
      <Button
        onClick={() => {
          if(state.user?.balance > price*(passengers[0]+passengers[1])+1500*passengers[2]){
            dispatch({
              type: "SET_TICKET",
              ticket: {
                ...props
              },
            });
            console.log(state.ticket);
            history.push('/booking');
          } else {
            alert('Insufficient Balance.')
          }
        }}
        className="searchItem__button"
        variant="contained"
        color="primary"
      >
        Book
      </Button>
    </Card>
  );
}

export default SearchItem;
