import React, { useState } from 'react'
import './TicketUploadForm.css'
import {
  Grid,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  TextField,
  Paper,
} from "@material-ui/core";
import axios from "../axios";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";


function TicketUploadForm() {

    const [ticket, setTicket] = useState({
        flightNo: "",
        airline: "",
        pnr: "Pending",
        from: "",
        to: "",
        departure: {date: new Date(), time: "07:30"},
        arrival: {date: new Date(), time: "07:30"},
        stops: 0,
        price: ""
      });

    const handleFlightNoChange = (e) => {
        setTicket(curr => ({...curr, flightNo: e.target.value}))
      }
      const handleAirlineChange = (e) => {
        setTicket(curr => ({...curr, airline: e.target.value}))
      }
      const handlePNRChange = (e) => {
        setTicket(curr => ({...curr, pnr: e.target.value}))
      }
      const handleFromChange = (e) => {
        setTicket(curr => ({...curr, from: e.target.value}))
      }
      const handleToChange = (e) => {
        setTicket(curr => ({...curr, to: e.target.value}))
      }
      const handleDepDateChange = (date) => {
        setTicket(curr => ({...curr, departure: {...curr.departure, date: new Date(date.toISOString().slice(0,10))}}))
      }
      const handleDepTimeChange = (e) => {
        setTicket(curr => ({...curr, departure: {...curr.departure, time: e.target.value}}))
      }
      const handleArrDateChange = (date) => {
        setTicket(curr => ({...curr, arrival: {...curr.arrival, date: new Date(date.toISOString().slice(0,10))}}))
      }
      const handleArrTimeChange = (e) => {
        setTicket(curr => ({...curr, arrival: {...curr.arrival, time: e.target.value}}))
      }
      const handleStopsChange = (e) => {
        setTicket(curr => ({...curr, stops: e.target.value}))
      }
      const handlePriceChange = (e) => {
        setTicket(curr => ({...curr, price: e.target.value}))
      }
    
      const handleTicketSubmit = () => {
          const depDate = ticket.departure.date.getTime()
          const depTime = ticket.departure.time.split(":").map((item) => parseInt(item))
          const departure = depDate + depTime[0]*3600000 + depTime[1]*60000 -5*3600000 -30*60000
    
          const arrDate = ticket.arrival.date.getTime()
          const arrTime = ticket.arrival.time.split(":").map((item) => parseInt(item))
          const arrival = arrDate + arrTime[0]*3600000 + arrTime[1]*60000 -5*3600000 -30*60000
    
          axios({
            method: 'post',
            url: 'api/tickets/',
            data: {...ticket, departure, arrival}
          }).then(res => alert("Ticket Uploaded")).catch(err => console.error(err))
      }


    return (
        <div className="upload">
            <h2 className="upload__title">Ticket Details Upload</h2>
            <Paper style={{padding: '30px'}} elevation={4}>
              <Grid container spacing={4}>
                <Grid item align="center" xs={4}>
                   <TextField
                    className="register__form__item"
                    id="filled-basic"
                    label="Flight No."
                    required={true}
                    value={ticket.flightNo}
                    onChange={handleFlightNoChange}
                    type="text"
                    variant="outlined"
                  />
                </Grid>
                <Grid item align="center" xs={4}>
                  <FormControl className="home__form__item" variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">
                      Airline
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      required={true}
                      value={ticket.airline}
                      onChange={handleAirlineChange}
                      label="Airline"
                      defaultValue={ticket.airline}
                      variant="outlined"
                    >
                      <MenuItem value={""}>
                        <em>Select...</em>
                      </MenuItem>
                      <MenuItem value={"AI"}>Air India</MenuItem>
                      <MenuItem value={"I5"}>Air Asia</MenuItem>
                      <MenuItem value={"KB"}>Druk Air</MenuItem>
                      <MenuItem value={"G8"}>Go Air</MenuItem>
                      <MenuItem value={"6E"}>Indigo Airlines</MenuItem>
                      <MenuItem value={"SG"}>SpiceJet</MenuItem>
                      <MenuItem value={"UK"}>Vistara</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item align="center" xs={4}>
                   <TextField
                    className="register__form__item"
                    id="filled-basic"
                    label="PNR"
                    defaultValue={ticket.pnr}
                    value={ticket.pnr}
                    onChange={handlePNRChange}
                    type="text"
                    variant="outlined"
                  />
                </Grid>
                <Grid item align="center" xs={4}>
                  <FormControl className="home__form__item" variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">
                      From
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={ticket.from}
                      onChange={handleFromChange}
                      label="From"
                      defaultValue={ticket.from}
                      variant="outlined"
                    >
                      <MenuItem value={""}>
                        <em>Select...</em>
                      </MenuItem>
                      <MenuItem value={"IXB"}>IXB</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item align="center" xs={4}>
                  <FormControl className="home__form__item" variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">
                      To
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={ticket.to}
                      onChange={handleToChange}
                      label="To"
                      defaultValue={ticket.to}
                      variant="outlined"
                    >
                      <MenuItem value={""}>
                        <em>Select...</em>
                      </MenuItem>
                      <MenuItem value={"CCU"}>CCU</MenuItem>
                      <MenuItem value={"GAU"}>GAU</MenuItem>
                      <MenuItem value={"DEL"}>DEL</MenuItem>
                      <MenuItem value={"AMD"}>AMD</MenuItem>
                      <MenuItem value={"BOM"}>BOM</MenuItem>
                      <MenuItem value={"HYD"}>HYD</MenuItem>
                      <MenuItem value={"BLR"}>BLR</MenuItem>
                      <MenuItem value={"MAA"}>MAA</MenuItem>
                      <MenuItem value={"DIB"}>DIB</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item align="center" xs={4}>
                  <FormControl className="home__form__item" variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">
                      Stops
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={ticket.stops}
                      onChange={handleStopsChange}
                      label="Stops"
                      defaultValue={ticket.stops}
                      variant="outlined"
                    >
                      <MenuItem value={0}>Non-Stop</MenuItem>
                      <MenuItem value={1}>One-Stop</MenuItem>
                      <MenuItem value={2}>Two-Stops</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item align="center" xs={4}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <div>
                      <InputLabel id="demo-simple-select-outlined-label">
                        Departure
                      </InputLabel>
                      <br/>
                      <KeyboardDatePicker
                        className="home__form__item"
                        disableToolbar
                        disablePast
                        variant="inline"
                        id="date-picker-dialog"
                        label="Date"
                        format="dd/MM/yyyy"
                        value={ticket.departure.date}
                        onChange={handleDepDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                      <TextField
                        id="time"
                        label="Time"
                        type="time"
                        defaultValue={ticket.departure.time}
                        value={ticket.departure.time}
                        onChange={handleDepTimeChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                      />
                    </div>
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item align="center" xs={4}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <div>
                      <InputLabel id="demo-simple-select-outlined-label">
                        Arrival
                      </InputLabel>
                      <br/>
                      <KeyboardDatePicker
                        className="home__form__item"
                        disableToolbar
                        disablePast
                        variant="inline"
                        id="date-picker-dialog"
                        label="Date"
                        format="dd/MM/yyyy"
                        value={ticket.arrival.date}
                        onChange={handleArrDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                      <TextField
                        id="time"
                        label="Time"
                        type="time"
                        defaultValue={ticket.arrival.time}
                        value={ticket.arrival.time}
                        onChange={handleArrTimeChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                      />
                    </div>
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item align="center" xs={4}>
                  <br/>
                  <TextField
                    className="register__form__item"
                    id="filled-basic"
                    label="Price"
                    required={true}
                    value={ticket.price}
                    onChange={handlePriceChange}
                    type="text"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Paper>
            <Button
                style={{margin: '20px'}}
                disabled={Object.values(ticket).includes("")}
                variant="contained"
                onClick={handleTicketSubmit}
                color="primary"
            >
              Upload Ticket
            </Button>
        </div>
    )
}

export default TicketUploadForm
