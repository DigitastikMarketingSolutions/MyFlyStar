import React, { useState } from "react";
import "./HomePage.css";
import bgImage from "../images/Background1.png";
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
  Card,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import SearchItem from "../components/SearchItem";
import axios from "../axios";

function HomePage() {
  const [sector, setSector] = useState("None");
  const [date, setDate] = useState(new Date());
  const [adults, setAdults] = useState(0);
  const [child, setChild] = useState(0);
  const [infants, setInfants] = useState(0);
  const [searches, setSearches] = useState([]);
  const[error, setError] = useState("");

  const handleSectorChange = (e) => {
    setSector(e.target.value);
  };
  const handleDateChange = (date) => {
    setDate(date);
  };
  const handleAdultsChange = (e) => {
    setAdults(e.target.value);
  };
  const handleChildChange = (e) => {
    setChild(e.target.value);
  };
  const handleInfantsChange = (e) => {
    setInfants(e.target.value);
  };

  const handleSearch = () => {
    axios({
      method: "get",
      url: `api/tickets?from=IXB&to=${sector}&departure=${date.getTime()}&type=available`,
      // data: {
      //   from: 'IXB',
      //   to: sector,
      //   departure: date.getTime()
      // }
    })
      .then((res) => {
        if(res.data.length){
          setSearches(res.data)
        } else {
          setError("No Flights Found.")
        }
        
      })
      .catch((err) => console.error(err));
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
            <InputLabel id="demo-simple-select-outlined-label">
              Flights
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={sector}
              onChange={handleSectorChange}
              label="Flights"
              defaultValue={sector}
              variant="outlined"
            >
              <MenuItem value={"None"}>
                <em>Select...</em>
              </MenuItem>
              <MenuItem value={"CCU"}>IXB / CCU</MenuItem>
              <MenuItem value={"GAU"}>IXB / GAU</MenuItem>
              <MenuItem value={"DEL"}>IXB / DEL</MenuItem>
              <MenuItem value={"AMD"}>IXB / AMD</MenuItem>
              <MenuItem value={"BOM"}>IXB / BOM</MenuItem>
              <MenuItem value={"HYD"}>IXB / HYD</MenuItem>
              <MenuItem value={"BLR"}>IXB / BLR</MenuItem>
              <MenuItem value={"MAA"}>IXB / MAA</MenuItem>
              <MenuItem value={"DIB"}>IXB / DIB</MenuItem>
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
                  "aria-label": "change date",
                }}
              />
            </div>
          </MuiPickersUtilsProvider>
          <FormControl className="home__form__item" variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">
              Adults
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={adults}
              onChange={handleAdultsChange}
              label="Adults"
              defaultValue={adults}
            >
              <MenuItem disabled={child + infants + 0 > 6} value={0}>
                0
              </MenuItem>
              <MenuItem disabled={child + infants + 1 > 6} value={1}>
                1
              </MenuItem>
              <MenuItem disabled={child + infants + 2 > 6} value={2}>
                2
              </MenuItem>
              <MenuItem disabled={child + infants + 3 > 6} value={3}>
                3
              </MenuItem>
              <MenuItem disabled={child + infants + 4 > 6} value={4}>
                4
              </MenuItem>
              <MenuItem disabled={child + infants + 5 > 6} value={5}>
                5
              </MenuItem>
              <MenuItem disabled={child + infants + 6 > 6} value={6}>
                6
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl className="home__form__item" variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">
              Children
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={child}
              onChange={handleChildChange}
              label="Children"
              defaultValue={child}
            >
              <MenuItem disabled={adults + infants + 0 > 6} value={0}>
                0
              </MenuItem>
              <MenuItem disabled={adults + infants + 1 > 6} value={1}>
                1
              </MenuItem>
              <MenuItem disabled={adults + infants + 2 > 6} value={2}>
                2
              </MenuItem>
              <MenuItem disabled={adults + infants + 3 > 6} value={3}>
                3
              </MenuItem>
              <MenuItem disabled={adults + infants + 4 > 6} value={4}>
                4
              </MenuItem>
              <MenuItem disabled={adults + infants + 5 > 6} value={5}>
                5
              </MenuItem>
              <MenuItem disabled={adults + infants + 6 > 6} value={6}>
                6
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl className="home__form__item" variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">
              Infants
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={infants}
              onChange={handleInfantsChange}
              label="Adults"
              defaultValue={infants}
            >
              <MenuItem disabled={child + adults + 0 > 6} value={0}>
                0
              </MenuItem>
              <MenuItem disabled={child + adults + 1 > 6} value={1}>
                1
              </MenuItem>
              <MenuItem disabled={child + adults + 2 > 6} value={2}>
                2
              </MenuItem>
              <MenuItem disabled={child + adults + 3 > 6} value={3}>
                3
              </MenuItem>
              <MenuItem disabled={child + adults + 4 > 6} value={4}>
                4
              </MenuItem>
              <MenuItem disabled={child + adults + 5 > 6} value={5}>
                5
              </MenuItem>
              <MenuItem disabled={child + adults + 6 > 6} value={6}>
                6
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <Button
          disabled={adults+child+infants===0 || sector==="None"}
          className="home__form__button"
          onClick={handleSearch}
          variant="contained"
          color="primary"
        >
          Search Flights
        </Button>
      </div>
      
      {
        searches.length ? (
          <Card className="home__search__guide" elevation={17}>
            <span>FLIGHT NO.</span>
            <span>SECTOR</span>
            <span>STOPS</span>
            <span>TRAVEL DATE</span>
            <span>DEP. / ARR.</span>
            <span>PRICE</span>
          </Card>
        ) : error ? (
          <Card className="home__search__noflights" elevation={12}>
              <span>{error}</span>
          </Card>
        ) : null
      }{
        searches.map(search => (
          <SearchItem key={search.flightNo} {...search} passengers={[adults, child, infants]}/>
        ))
      }
    </div>
  );
}

export default HomePage;
