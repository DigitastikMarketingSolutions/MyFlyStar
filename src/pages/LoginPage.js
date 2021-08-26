import React, { useState } from "react";
import { auth } from "../Firebase";

import "./LoginPage.css";
import bgImage from "../images/Background1.png";
import {
    Paper,
    Button,
    TextField,
    Typography,
    Modal,
} from "@material-ui/core";
import { Link } from "react-router-dom";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleSubmit = (e) => {
        auth.signInWithEmailAndPassword(email, password)
            .then(_ => {
                // Blank
            })
            .catch((err) => {
                console.error(err);
                if (err.code === "auth/invalid-email") {
                    alert(`${email} is not a valid email.`);
                } else if (err.code === "auth/wrong-password") {
                    if (password === "") {
                        alert("Please enter the password.");
                    } else {
                        alert("Wrong password.");
                    }
                } else if (err.code === "auth/user-not-found") {
                    alert("User does not exist.");
                }
            });
    };
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
                <Typography
                    className="login__form__title"
                    variant="h3"
                    component="h3"
                >
                    Login
                </Typography>
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
                <Button
                    className="login__form__item"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                >
                    Continue
                </Button>
                <EmailReset/>
                <Link className="login__form__link" to="/register">
                    <h4>Create an account</h4>
                </Link>
            </Paper>
        </div>
    );
}

export default LoginPage;

const EmailReset = () => {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");

    const handleResetPassword = () => {
      auth.sendPasswordResetEmail(email).then(_ => {
        setOpen(false)
        setEmail("")
        alert("Password reset email sent.")
      }).catch(err=> {
        if(err.code==="auth/invalid-email"){
          alert("Email is invalid!")
        } else if(err.code==="auth/user-not-found"){
          alert("No user exists with this email")
        }
      })
    }

    return (
        <div>
            <h4>Forgot password ? <span className="login__form__link" onClick={() => setOpen(true)}>Click Here!</span></h4>
            <Modal open={open} onClose={() => setOpen(false)}>
                <div className="resetModal">
                    <p>We will send a password reset link to your email.</p>
                    <TextField
                        size="small"
                        variant="filled"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={handleResetPassword}>Reset Password</Button>
                </div>
            </Modal>
        </div>
    );
};
