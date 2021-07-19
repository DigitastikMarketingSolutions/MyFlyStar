import React, { useState } from "react";

import "./HomePage.css";
import bgImage from "../Background1.png";
import {
  Tabs,
  Tab,
  Paper,
  FormGroup,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Grid,
  Button
} from "@material-ui/core";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns"
import "date-fns"
import SearchItem from "../components/SearchItem";

function HomePage() {
  const [flight, setFlight] = useState(0);
  const [date, setDate] = useState(new Date());
  const [adults, setAdults] = useState(0);
  const [child, setChild] = useState(0);

  const handleFlightChange = (e) => {
    setFlight(e.target.value);
  };
  const handleDateChange = (date) => {
    // setDate(e.target.value);
    setDate(date)
  };
  const handleAdultsChange = (e) => {
    setAdults(e.target.value);
  };
  const handleChildChange = (e) => {
    setChild(e.target.value);
  };

  return (
    <div className="home">
      <div className="home__bgImage">
        <img src={bgImage} alt="" />
      </div>
      <div className="home__hero">
        <div className="home__hero__text">
          <h1>Looking for Flights?</h1>
          <h5>We will help you bag the greatest deals.</h5>
        </div>
      </div>
      <div className="home__form">
        <div className="home__form__elements">
          <FormControl className="home__form__item" variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">Flights</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={flight}
              onChange={handleFlightChange}
              label="Flights"
              defaultValue={flight}
              variant="outlined"
            >
              <MenuItem value={0}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>One</MenuItem>
              <MenuItem value={2}>Two</MenuItem>
              <MenuItem value={3}>Three</MenuItem>
              <MenuItem value={4}>Four</MenuItem>
              <MenuItem value={5}>Five</MenuItem>
              <MenuItem value={6}>Six</MenuItem>
              <MenuItem value={7}>Seven</MenuItem>
              <MenuItem value={8}>Eight</MenuItem>
              <MenuItem value={9}>Nine</MenuItem>
            </Select>
          </FormControl>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div>
              <KeyboardDatePicker
                className="home__form__item" 
                disableToolbar
                disablePast
                variant="inline"
                id="date-picker-dialog"
                label="Date of travel"
                format="dd/MM/yyyy"
                value={date}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </div>
          </MuiPickersUtilsProvider>
          <FormControl className="home__form__item" variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">Adults</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={adults}
              onChange={handleAdultsChange}
              label="Adults"
              defaultValue={adults}
            >
              <MenuItem disabled={child+0>6} value={0}>0</MenuItem>
              <MenuItem disabled={child+1>6} value={1}>1</MenuItem>
              <MenuItem disabled={child+2>6} value={2}>2</MenuItem>
              <MenuItem disabled={child+3>6} value={3}>3</MenuItem>
              <MenuItem disabled={child+4>6} value={4}>4</MenuItem>
              <MenuItem disabled={child+5>6} value={5}>5</MenuItem>
              <MenuItem disabled={child+6>6} value={6}>6</MenuItem>
            </Select>
          </FormControl>
          <FormControl className="home__form__item" variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">Children</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={child}
              onChange={handleChildChange}
              label="Children"
              defaultValue={child}
            >
              <MenuItem disabled={adults+0>6} value={0}>0</MenuItem>
              <MenuItem disabled={adults+1>6} value={1}>1</MenuItem>
              <MenuItem disabled={adults+2>6} value={2}>2</MenuItem>
              <MenuItem disabled={adults+3>6} value={3}>3</MenuItem>
              <MenuItem disabled={adults+4>6} value={4}>4</MenuItem>
              <MenuItem disabled={adults+5>6} value={5}>5</MenuItem>
              <MenuItem disabled={adults+6>6} value={6}>6</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Button className="home__form__button" variant="contained" color="primary">Search Flights</Button>
      </div>
      {/* <SearchItem/>
      <SearchItem/>
      <SearchItem/>
      <SearchItem/> */}
    </div>
  );
}

export default HomePage;
