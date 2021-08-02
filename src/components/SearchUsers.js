import axios from "../axios";
import React, { useEffect, useState } from "react";
import "./SearchUsers.css";
import { Button, Modal } from "@material-ui/core";

function SearchUsers() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {
    axios({
      method: "get",
      url: "api/users?type=approved",
      headers: {"Access-Control-Allow-Origin": "*"}
    })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.error(err));
  }, [setUsers]);

  return (
    <div className="searchUsers">
      <h2 className="searchUsers__title">All Users</h2>
      {users.length
        ? users.map((user) => {
            return (
              <div key={user._id} className="searchUsers__user">
                <span>
                  {user.name} - {user.company}
                </span>
                <Button variant="outlined" color="default" onClick={() => {
                    setUser(user)
                    setOpen(true);
                }}>
                  View
                </Button>
              </div>
            );
          })
        : "No users yet"}
      <Modal open={open} onClose={() => {
          setOpen(false);
          setUser({});
        }}>
        <div className="searchUsers__modal">
            <h1>{user.name}</h1>
            <h2>{user.company}</h2>
            <span>{user['state']}</span>
            <span>{user.phone}</span>
            <span>{user.email}</span>
        </div>
      </Modal>
    </div>
  );
}

export default SearchUsers;
