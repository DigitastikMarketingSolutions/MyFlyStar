import React, { useState } from "react";
import {Settings, AddCircleRounded} from "@material-ui/icons";
import { Button, Menu, MenuItem, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Logo from "../images/Logo.png";
import logo from "../images/DigiTastik_logo.png"
import "./Header.css";
import { auth } from "../Firebase";
import { useStateValue } from "../data/StateProvider";

function Header() {
  const [state, dispatch] = useStateValue();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSettingsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        handleClose();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="header">
      <div className="header__logo">
        <Link className="header__links" to="/">
          <img className="header__logo__image" src={Logo} alt="" />
          <h1>MyFlyStar</h1>
        </Link>
      </div>
      <Typography
        hidden={
          !auth.currentUser || auth.currentUser?.uid === "kf9ofE8KLwQpehBUj5WGQS2uqB43"
        }
        variant="h6"
        component="h6"
      >
        Welcome, {state.user?.displayName}
        <br/>
        <span>Current Balance: {state.user?.balance}<Link style={{textDecoration: 'none', color: '#2f2f2f'}} to='/payment'><AddCircleRounded fontSize="small"/></Link></span>
      </Typography>
      {auth.currentUser?.uid === "kf9ofE8KLwQpehBUj5WGQS2uqB43" ? (
        <div className="header__admin__logout">
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      ) : auth.currentUser ? (
        <div>
          <div
            hidden={!auth.currentUser}
            aria-controls="settings"
            aria-haspopup="true"
            onClick={handleSettingsClick}
          >
            <Settings className="header__settings" fontSize="large" />
          </div>

          <Menu
            id="settings"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: "300px",
                width: "200px",
              },
            }}
          >
            <MenuItem>
              <Link className="header__links" to="/profile">Profile</Link>
            </MenuItem>
            <MenuItem>
              <Link className="header__links" to="/orders">My Orders</Link>
            </MenuItem>
            <MenuItem>
              <Link className="header__links" to="/contact">Contact Us</Link>
            </MenuItem>
            <MenuItem>
              <Link className="header__links" to="/payment">Payments</Link>
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      ) : (
        <div className="header__brand">
            <img src={logo} alt="Digitastik Marketing Solutions Logo"/>
            <h4>Powered by Digitastik<br/>Marketing Solutions</h4>
        </div>
      )}
    </div>
  );
}

export default Header;
