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
  Modal,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import axios from "../axios";
import {
  MuiPickersUtilsProvider,
  DatePicker
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
        price: "",
        noOfTickets: ""
      });
      const [open, setOpen] = useState(false)

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
        try{
          console.log(date)
          setTicket(curr => ({...curr, departure: {...curr.departure, date: new Date(date.toISOString().slice(0,10))}}))
        } catch(err){
          console.log(err)
        }
        
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
      const handleNoOfTicketsChange = (e) => {
        setTicket(curr => ({...curr, noOfTickets: e.target.value}))
      }
      const handleHotDealChange = (e) => {
        setTicket(curr => ({...curr, hotDeal: e.target.checked}))
      }
    
      const handleTicketSubmit = () => {
          const depDate = ticket.departure.date.getTime()
          const depTime = ticket.departure.time.split(":").map((item) => parseInt(item))
          const departure = depDate + depTime[0]*3600000 + depTime[1]*60000 -5*3600000 -30*60000
    
          const arrDate = ticket.arrival.date.getTime()
          const arrTime = ticket.arrival.time.split(":").map((item) => parseInt(item))
          const arrival = arrDate + arrTime[0]*3600000 + arrTime[1]*60000 -5*3600000 -30*60000

          const ticketQty = parseInt(ticket.noOfTickets)
    
          axios({
            method: 'post',
            url: 'api/tickets/',
            data: {...ticket, departure, arrival, noOfTickets: ticketQty},
            headers: { "Access-Control-Allow-Origin": "*" },
          }).then(res => {
            console.log(res.data)
            alert("Ticket Uploaded")
            setOpen(false)
          }).catch(err => console.error(err))
      }


    return (
        <div className="upload">
            <h2 className="upload__title">Ticket Details Upload</h2>
            <Paper style={{padding: '30px'}} elevation={4}>
              <Grid container spacing={4}>
                <Grid item align="center" xs={4}>
                   <TextField
                    className="register__form__item"
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
                    <InputLabel id="airline-label">
                      Airline
                    </InputLabel>
                    <Select
                      labelId="airline-label"
                      required={true}
                      value={ticket.airline}
                      onChange={handleAirlineChange}
                      label="Airline"
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
                    label="PNR"
                    value={ticket.pnr}
                    onChange={handlePNRChange}
                    type="text"
                    variant="outlined"
                  />
                </Grid>
                <Grid item align="center" xs={3}>
                  <FormControl className="home__form__item" variant="outlined">
                    <InputLabel id="from-label">
                      From
                    </InputLabel>
                    <Select
                      labelId="from-label"
                      value={ticket.from}
                      onChange={handleFromChange}
                      label="From"
                      variant="outlined"
                    >
                      <MenuItem value={""}>
                        <em>Select...</em>
                      </MenuItem>
                      <MenuItem disabled={ticket.to === "IXB"} value={"IXB"}>IXB</MenuItem>
                      <MenuItem disabled={ticket.to === "CCU"} value={"CCU"}>CCU</MenuItem>
                      <MenuItem disabled={ticket.to === "GAU"} value={"GAU"}>GAU</MenuItem>
                      <MenuItem disabled={ticket.to === "DEL"} value={"DEL"}>DEL</MenuItem>
                      <MenuItem disabled={ticket.to === "AMD"} value={"AMD"}>AMD</MenuItem>
                      <MenuItem disabled={ticket.to === "BOM"} value={"BOM"}>BOM</MenuItem>
                      <MenuItem disabled={ticket.to === "HYD"} value={"HYD"}>HYD</MenuItem>
                      <MenuItem disabled={ticket.to === "BLR"} value={"BLR"}>BLR</MenuItem>
                      <MenuItem disabled={ticket.to === "MAA"} value={"MAA"}>MAA</MenuItem>
                      <MenuItem disabled={ticket.to === "DIB"} value={"DIB"}>DIB</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item align="center" xs={3}>
                  <FormControl className="home__form__item" variant="outlined">
                    <InputLabel id="to-label">
                      To
                    </InputLabel>
                    <Select
                      labelId="to-label"
                      value={ticket.to}
                      onChange={handleToChange}
                      label="To"
                      variant="outlined"
                    >
                      <MenuItem value={""}>
                        <em>Select...</em>
                      </MenuItem>
                      <MenuItem disabled={ticket.from === "IXB"} value={"IXB"}>IXB</MenuItem>
                      <MenuItem disabled={ticket.from === "CCU"} value={"CCU"}>CCU</MenuItem>
                      <MenuItem disabled={ticket.from === "GAU"} value={"GAU"}>GAU</MenuItem>
                      <MenuItem disabled={ticket.from === "DEL"} value={"DEL"}>DEL</MenuItem>
                      <MenuItem disabled={ticket.from === "AMD"} value={"AMD"}>AMD</MenuItem>
                      <MenuItem disabled={ticket.from === "BOM"} value={"BOM"}>BOM</MenuItem>
                      <MenuItem disabled={ticket.from === "HYD"} value={"HYD"}>HYD</MenuItem>
                      <MenuItem disabled={ticket.from === "BLR"} value={"BLR"}>BLR</MenuItem>
                      <MenuItem disabled={ticket.from === "MAA"} value={"MAA"}>MAA</MenuItem>
                      <MenuItem disabled={ticket.from === "DIB"} value={"DIB"}>DIB</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item align="center" xs={3}>
                  <FormControl className="home__form__item" variant="outlined">
                    <InputLabel id="stops-label">
                      Stops
                    </InputLabel>
                    <Select
                      labelId="stops-label"
                      value={ticket.stops}
                      onChange={handleStopsChange}
                      label="Stops"
                      variant="outlined"
                    >
                      <MenuItem value={0}>Non-Stop</MenuItem>
                      <MenuItem value={1}>One-Stop</MenuItem>
                      <MenuItem value={2}>Two-Stops</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item align="center" xs={3}>
                  <TextField
                    className="register__form__item"
                    label="No. of tickets"
                    required={true}
                    value={ticket.noOfTickets}
                    onChange={handleNoOfTicketsChange}
                    type="number"
                    variant="outlined"
                  />
                </Grid>
                <Grid item align="center" xs={3}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <div>
                      <InputLabel id="departure-label">
                        Departure
                      </InputLabel>
                      <br/>
                      <DatePicker
                        className="home__form__item"
                        disableToolbar
                        disablePast
                        variant="inline"
                        label="Date"
                        format="dd/MM/yyyy"
                        value={ticket.departure.date}
                        onChange={handleDepDateChange}
                        onError={(err) => console.log(err)}
                      />
                      <TextField
                        label="Time"
                        type="time"
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
                <Grid item align="center" xs={3}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <div>
                      <InputLabel id="arrival-label">
                        Arrival
                      </InputLabel>
                      <br/>
                      <DatePicker
                        className="home__form__item"
                        disableToolbar
                        disablePast
                        variant="inline"
                        label="Date"
                        format="dd/MM/yyyy"
                        value={ticket.arrival.date}
                        onChange={handleArrDateChange}
                      />
                      <TextField
                        label="Time"
                        type="time"
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
                <Grid item align="center" xs={3}>
                  <br/>
                  <TextField
                    className="register__form__item"
                    label="Price"
                    required={true}
                    value={ticket.price}
                    onChange={handlePriceChange}
                    type="text"
                    variant="outlined"
                  />
                </Grid>
                <Grid item align="center" xs={3}>
                  <br/>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={ticket.hotDeal}
                        onChange={handleHotDealChange}
                        color="primary"
                      />
                    }
                    label="Hot Deal?"
                  />
                </Grid>
              </Grid>
            </Paper>
            <Button
                style={{margin: '20px'}}
                disabled={Object.values(ticket).includes("")}
                variant="contained"
                onClick={() => setOpen(true)}
                color="primary"
            >
              Upload Ticket
            </Button>
            <Modal
              open={open}
              onClose={() => setOpen(false)}
            >
                <div className="searchTickets__modal">
                    <p>Are you sure you want to upload this ticket?</p>
                    <div className="searchTickets__modal__buttons">
                    <Button variant="contained" color="secondary" onClick={() => setOpen(false)} >
                        No, Go Back
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleTicketSubmit} >
                        Yes, Upload
                    </Button>
                    </div>
                </div>
            </Modal>
            <Button variant="contained" color="secondary" onClick={() => {
              setTicket({
                flightNo: "",
                airline: "",
                pnr: "Pending",
                from: "",
                to: "",
                departure: {date: new Date(), time: "07:30"},
                arrival: {date: new Date(), time: "07:30"},
                stops: 0,
                price: "",
                noOfTickets: "",
                hotDeal: false
              })
            }}>Clear Form</Button>
        </div>
    )
}

export default TicketUploadForm
