import React, { useState } from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import { Button, Menu, MenuItem, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import Logo from "../Logo.png";
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
        <img className="header__logo__image" src={Logo} alt="" />
        <h1>MyFlyStar</h1>
      </div>
      <Typography
        hidden={
          !state.user || state.user?.uid === "kf9ofE8KLwQpehBUj5WGQS2uqB43"
        }
        variant="h5"
        component="h5"
      >
        Welcome, {state.user?.displayName}
      </Typography>
      {state.user?.uid === "kf9ofE8KLwQpehBUj5WGQS2uqB43" ? (
        <div className="header__admin__logout">
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      ) : (
        <div>
          <div
            hidden={!state.user}
            aria-controls="settings"
            aria-haspopup="true"
            onClick={handleSettingsClick}
          >
            <SettingsIcon className="header__settings" fontSize="large" />
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
              <Link to="/profile">Profile</Link>
            </MenuItem>
            <MenuItem
              hidden={state.user?.uid === "kf9ofE8KLwQpehBUj5WGQS2uqB43"}
            >
              <Link to="/orders">My Orders</Link>
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      )}
    </div>
  );
}

export default Header;
