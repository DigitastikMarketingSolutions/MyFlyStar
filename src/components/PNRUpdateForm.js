import React, { useEffect, useState } from 'react'
import './PNRUpdateForm.css'
import { TextField, Button } from '@material-ui/core'
import axios from '../axios'
import { useStateValue } from "../data/StateProvider";
import {customAlphabet} from 'nanoid'

function PNRUpdateForm() {
    const [pending, setPending] = useState([])

    const loadPending = () => {
        axios({
            method: 'get',
            url: 'api/tickets?type=pending',
            headers: { "Access-Control-Allow-Origin": "*" },
        }).then(res => {
            setPending(res.data)
        }).catch(err => console.error(err))
    }

    useEffect(() => {
        loadPending()
    }, [setPending])

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
        { pending.length!==0 ?
            pending.map((item, i) => (
                <PNRUpdateFormElement  key={customAlphabet('abcdefghijkl',10)+i} idx={i} {...item} handleCallback={loadPending}/>
            )) : "No Pending PNR Updates"
        }      
        </div>
    )
}

export default PNRUpdateForm


const PNRUpdateFormElement = (props) => {
    const [pnr, setPnr] = useState("");
    const [state, dispatch] = useStateValue();

    const handleUpdatePNR = (tid) => {
        axios({
            method: 'patch',
            url: `api/tickets?type=updatePNR&id=${tid}&pnr=${pnr}`,
            headers: {"Allow-Control-Access-Origin": "*"}
        }).then(res => {
            axios({
                method: 'patch',
                url: `api/bookings?id=${tid}&pnr=${pnr}`,
                headers: { "Access-Control-Allow-Origin": "*" },
            }).then(_ => {
                console.log(_.data)
                props.handleCallback()
            })
        })
    }

    const date = new Date(props.departure).toISOString()

    return(
        <div key={props.bookingId} className="pnr__search" >
            <div className="pnr__search__details">
                <span><b>Flight No.</b></span>
                <span>{props.flightNo}</span>
            </div>
            <div className="pnr__search__details">
                <span><b>Airline</b></span>
                <span>{state.flights[props.airline][0]}</span>
            </div>
            <div className="pnr__search__details">
                <span><b>Sector</b></span>
                <span>{props.from}/{props.to}</span>
            </div>
            <div className="pnr__search__details">
                <span><b>Date of Journey</b></span>
                <span>{date.slice(8,10)+"-"+date.slice(5,7)+"-"+date.slice(0,4)}</span>
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
              <Button variant="contained" onClick={() => handleUpdatePNR(props._id)} color="primary">
                Update PNR
              </Button>  
            </div>
        </div>
    )
}