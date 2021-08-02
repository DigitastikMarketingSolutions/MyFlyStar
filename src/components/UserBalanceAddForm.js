import React, { useState } from "react";
import "./UserBalanceAddForm.css";
import { TextField, Button } from "@material-ui/core";
import axios from '../axios'

function UserBalanceAddForm() {
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [agent, setAgent] = useState({})

  const handleUserSearch = () => {
    axios({
      method: 'get',
      url: `api/users?phone=${phone}`
    }).then(res => {
      setAgent(res.data)
    })
  }

  const handleBalanceAdd = () => {
    axios({
      method: 'patch',
      url: `api/users?phone=${agent.phone}&type=balanceAdd&amount=${amount}`
    }).then(res => {
      // console.log(res.data)
      setAgent(res.data.user)
      setAmount("")
    })
  }

  return (
    <div className="balanceAdd">
      <h2 className="balanceAdd__title">Add Balance</h2>
      <div className="balanceAdd__inputpanel">
        <TextField
          className="balanceAdd__inputs"
          variant="filled"
          type="text"
          size="small"
          label="Phone No."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Button  className="balanceAdd__inputs" variant="contained" color="primary" onClick={handleUserSearch}>Search</Button>
      </div>
      <div className="balanceAdd__agent" style={{visibility: agent.hasOwnProperty('name') ? 'visible' : 'hidden'}}>
        <h1>{agent.name}</h1>
        <span>Agency: {agent.company}</span>
        <span>Email: {agent.email}</span>
        <span>Phone: {agent.phone}</span>
        <span>Current Balance: Rs. {agent.balance}</span>
        <div className="balanceAdd__amount">
          <TextField
            className="balanceAdd__inputs"
            variant="filled"
            type="text"
            size="small"
            label="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Button variant="contained" onClick={handleBalanceAdd} color="primary">
            Add Amount
          </Button>  
        </div>
      </div>
      
    </div>
  );
}

export default UserBalanceAddForm;
