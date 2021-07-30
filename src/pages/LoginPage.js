import React, { useState } from "react";
import { auth } from '../Firebase'
import axios from '../axios'

import "./LoginPage.css";
import bgImage from "../images/Background1.png";
import {
  Paper,
  InputLabel,
  Button,
  TextField,
  Typography
} from "@material-ui/core";
import { useStateValue } from "../data/StateProvider";
import { Link } from "react-router-dom";

function LoginPage() {
  const [state, dispatch] = useStateValue()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [approved, setApproved] = useState(true);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        if(email!=="admin@123.com"){
          // axios({
          //   method: "get",
          //   url: `/api/users/${email}`
          // })
          // .then(res => {
            console.log(authUser)
            // dispatch({
            //   type: "SET_USER",
            //   user: {...authUser, displayName: res.data.name.split(' ')[0], balance: res.data.balance}
            // })
          // })
        } else {
          
          console.log(authUser)
            // dispatch({
            //   type: "SET_USER",
            //   user: {...authUser, displayName: "Admin"}
            // })
        }
      })
      .catch(err => {
        console.error(err);
        if(err.code === 'auth/invalid-email'){
          alert(`${email} is not a valid email.`)
        } else if(err.code === 'auth/wrong-password'){
          if(password===''){
            alert('Please enter the password.')
          } else {
            alert('Wrong password.')
          }
        } else if (err.code === 'auth/user-not-found'){
          alert('User does not exist.')
        }
      });
  }
  return (
    <div className="login">
      <div className="login__bgImage">
        <img src={bgImage} alt="" />
      </div>
      <div className="login__hero">
        <div className="login__hero__text">
          <h1>Looking for Flights?</h1>
          <h5>We will help you bag the greatest deals.</h5>
        </div>
      </div>
      <Paper className="login__form">
        <Typography className="login__form__title" variant="h3" component="h3">Login</Typography>
        {/* <InputLabel className="login__form__label" id="email">Email</InputLabel> */}
        <TextField
          className="login__form__item"
          label="Email"
          size="small"
          type="email"
          value={email}
          onChange={handleEmailChange}
          autoComplete="current-password"
          variant="filled"
        />
        {/* <InputLabel className="login__form__label" id="password">Password</InputLabel> */}
        <TextField
          className="login__form__item"
          label="Password"
          size="small"
          value={password}
          onChange={handlePasswordChange}
          type="password"
          autoComplete="current-password"
          variant="filled"
        />
        <Button className="login__form__item" variant="contained" color="primary" onClick={handleSubmit}>Continue</Button>
        <Link className="login__form__link" to='/register'><h4>Create an account</h4></Link>
      </Paper>
    </div>
  );
}

export default LoginPage;
