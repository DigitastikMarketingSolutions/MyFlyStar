import React, { useState } from "react";

import "./RegisterPage.css";
import bgImage from "../images/Background1.png";
import {
  Paper,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography
} from "@material-ui/core";
import { ArrowForward, ArrowBack } from '@material-ui/icons';
import SwipeableViews from 'react-swipeable-views'
import axios from "../axios";

function RegisterPage() {
  const [tab, setTab] = useState(0);
  const [company, setCompany] = useState('');
  const [agent, setAgent] = useState('');
  const [province, setProvince] = useState('West Bengal');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const handleCompanyChange = (e) => {
    setCompany(e.target.value)
  };
  const handleAgentChange = (e) => {
    setAgent(e.target.value);
  };
  const handleProvinceChange = (e) => {
    console.log(e.target.value)
    setProvince(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value)
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePwdChange = (e) => {
    setPwd(e.target.value);
  };

  const handleSubmit = () => {
    axios({
      method: 'post',
      url: '/api/users/',
      data: {
        name: agent,
        state: province,
        company,
        email,
        password: pwd,
        phone
      }
    })
    .then(data => {
      console.log(data)
      alert("You will be contacted in 72hrs on behalf of your approval request.\nThank you!")
      setTab(0);
      setCompany("");
      setAgent("");
      setProvince("West Bengal");
      setPhone("");
      setEmail("");
      setPwd("");
    }).catch(err => console.error(err))
  }

  const firstTab = (
    <div index={0} className="register__form__view">
      <Typography className="register__form__view__title" variant="h4" component="h4">Agent Details</Typography>
      <TextField
        className="register__form__item"
        id="filled-basic"
        label="Agency Name"
        required={true}
        value={company}
        onChange={handleCompanyChange}
        size="small"
        type="text"
        variant="outlined"
      />
      <TextField
        className="register__form__item"
        label="Agent Name"
        required={true}
        value={agent}
        onChange={handleAgentChange}
        size="small"
        type="text"
        variant="outlined"
      />        
      <FormControl className="register__form__item" variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">State</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          value={province}
          onChange={handleProvinceChange}
          label="State"
          
        >
          <MenuItem value={"Andhra Pradesh"}>Andhra Pradesh</MenuItem>
          <MenuItem value={"Arunachal Pradesh"}>Arunachal Pradesh</MenuItem>
          <MenuItem value={"Assam"}>Assam</MenuItem>
          <MenuItem value={"Bihar"}>Bihar</MenuItem>
          <MenuItem value={"Chhattisgarh"}>Chhattisgarh</MenuItem>
          <MenuItem value={"Goa"}>Goa</MenuItem>
          <MenuItem value={"Gujarat"}>Gujarat</MenuItem>
          <MenuItem value={"Haryana"}>Haryana</MenuItem>
          <MenuItem value={"Himachal Pradesh"}>Himachal Pradesh</MenuItem>
          <MenuItem value={"Jammu and Kashmir"}>Jammu and Kashmir</MenuItem>
          <MenuItem value={"Jharkhand"}>Jharkhand</MenuItem>
          <MenuItem value={"Karnataka"}>Karnataka</MenuItem>
          <MenuItem value={"Kerala"}>Kerala</MenuItem>
          <MenuItem value={"Madhya Pradesh"}>Madhya Pradesh</MenuItem>
          <MenuItem value={"Maharashtra"}>Maharashtra</MenuItem>
          <MenuItem value={"Manipur"}>Manipur</MenuItem>
          <MenuItem value={"Meghalaya"}>Meghalaya</MenuItem>
          <MenuItem value={"Mizoram"}>Mizoram</MenuItem>
          <MenuItem value={"Nagaland"}>Nagaland</MenuItem>
          <MenuItem value={"Odisha"}>Odisha</MenuItem>
          <MenuItem value={"Punjab"}>Punjab</MenuItem>
          <MenuItem value={"Rajasthan"}>Rajasthan</MenuItem>
          <MenuItem value={"Sikkim"}>Sikkim</MenuItem>
          <MenuItem value={"Tamil Nadu"}>Tamil Nadu</MenuItem>
          <MenuItem value={"Telangana"}>Telangana</MenuItem>
          <MenuItem value={"Tripura"}>Tripura</MenuItem>
          <MenuItem value={"Uttar Pradesh"}>Uttar Pradesh</MenuItem>
          <MenuItem value={"Uttarakhand"}>Uttarakhand</MenuItem>
          <MenuItem value={"West Bengal"}>West Bengal</MenuItem>
        </Select>
      </FormControl>
    </div>
  )

  const secondTab = (
    <div index={0} className="register__form__view">
      <Typography className="register__form__view__title" variant="h4" component="h4">Contact Details</Typography>
      <TextField
        className="register__form__item"
        label="Phone"
        required={true}
        value={phone}
        onChange={handlePhoneChange}
        size="small"
        type="phone"
        variant="outlined"
      />
      <TextField
        className="register__form__item"
        id="filled-basic"
        label="Email"
        required={true}
        value={email}
        onChange={handleEmailChange}
        size="small"
        type="email"
        variant="outlined"
      />   
      <TextField
        className="register__form__item"
        label="Password"
        required={true}
        value={pwd}
        onChange={handlePwdChange}
        size="small"
        type="password"
        variant="outlined"
      />
    </div>
  )

  return (
    <div className="register">
      <img className="register__bgImage" src={bgImage} alt="" />
      <div className="register__hero">
        <div className="register__hero__text">
          <h1>Looking for Flights?</h1>
          <h5>We will help you bag the greatest deals.</h5>
        </div>
      </div>
      <Paper className="register__form">
        <div className="register__form__tabspanel">
          <div style={{visibility: tab === 0 ? 'hidden' : 'visible'}} onClick={() => setTab(0)} className="register__form__tab"><ArrowBack color="primary"/></div>
          <div style={{visibility: tab === 1 ? 'hidden' : 'visible'}} onClick={() => setTab(1)} className="register__form__tab"><ArrowForward color="primary"/></div>
        </div>
        <SwipeableViews
        axis={'x'}
        index={tab}
      >
        {firstTab}
        {secondTab}
      </SwipeableViews>
        
        <Button disabled={[company, agent, phone, email, pwd].includes("")} variant="contained" color="primary" onClick={handleSubmit}>Get Approval</Button>
      </Paper>
    </div>
  );
}

export default RegisterPage;

