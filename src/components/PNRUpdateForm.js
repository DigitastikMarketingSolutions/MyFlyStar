import React, { useEffect, useState } from 'react'
import './PNRUpdateForm.css'
import { TextField, Button } from '@material-ui/core'
import axios from '../axios'
import { useStateValue } from "../data/StateProvider";

function PNRUpdateForm() {
    const [pending, setPending] = useState([])
    const [pnr, setPnr] = useState('')
    const [state, dispatch] = useStateValue()

    const loadPending = () => {
        axios({
            method: 'get',
            url: 'api/tickets?type=pending'
        }).then(res => {
            setPending(res.data)
        }).catch(err => console.error(err))
    }

    useEffect(() => {
        loadPending()
    }, [setPending])

    const handleUpdatePNR = (bid) => {
        axios({
            method: 'patch',
            url: `api/bookings?bid=${bid}&pnr=${pnr}`
        }).then(res => {
            axios({
                method: 'patch',
                url: `api/tickets?bid=${bid}&pnr=${pnr}`
            }).then(_ => {
                loadPending()
            })
        })
    }

    return (
        <div className="pnr">
            <h2 className="pnr__title">Update PNR</h2>
        {/* <div className="balanceAdd__inputpanel">
            <TextField
              className="balanceAdd__inputs"
              variant="filled"
              type="text"
              size="small"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button  className="balanceAdd__inputs" variant="contained" color="primary" onClick={handleUserSearch}>Search</Button>
        </div> */}
        { pending.filter(item => item.booked).length ? 
            pending.filter(item => item.booked).map(item => {
                const date = new Date(item.bookingDate).toISOString()
                return(
                    <div key={item.bookingId} className="pnr__search" >
                        <div className="pnr__search__details">
                            <span><b>Booking Id</b></span>
                            <span>{item.bookingId}</span>
                        </div>
                        <div className="pnr__search__details">
                            <span><b>Booking Date</b></span>
                            <span>{date.slice(8,10)+'-'+date.slice(5,7)+'-'+date.slice(0,4)}</span>
                        </div>
                        <div className="pnr__search__details">
                            <span><b>Flight No.</b></span>
                            <span>{item.flightNo}</span>
                        </div>
                        <div className="pnr__search__details">
                            <span><b>Airline</b></span>
                            <span>{state.flights[item.airline][0]}</span>
                        </div>

                        <div className="pnr__update">
                          <TextField
                            className="pnr__input"
                            variant="filled"
                            type="text"
                            size="small"
                            label="New PNR"
                            value={pnr}
                            onChange={(e) => setPnr(e.target.value)}
                          />
                          <Button variant="contained" onClick={() => handleUpdatePNR(item.bookingId)} color="primary">
                            Update PNR
                          </Button>  
                        </div>
                    </div>
                )
            }) : "No Pending PNR Updates"
        }      
        </div>
    )
}

export default PNRUpdateForm
