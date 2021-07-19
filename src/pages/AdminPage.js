import {
  Grid,
  Typography,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Divider,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "../axios";
import { useStateValue } from "../data/StateProvider";
import { auth } from "../Firebase";

import "./AdminPage.css";

function AdminPage() {
  const [agents, setAgents] = useState([]);
  const [agent, setAgent] = useState("");
  const [ticket, setTicket] = useState({});

  const [state, dispatch] = useStateValue();

  useEffect(() => {
    axios({
      method: 'get',
      url: 'api/users/pending'
    })
    .then((res) => {
        console.log(res.data)
        setAgents(res.data)
    });
  }, []);

  const handleAgentChange = (e) => {
    setAgent(e.target.value);
  };

  const handleApproval = () => {
    const approvedAgent = agents.filter((item) => item._id === agent)[0];
    console.log(approvedAgent)
    axios({
      method: "patch",
      url: `/api/users/${approvedAgent.email}`
    }).then((res) => {
      alert(res.data.message);
      setAgents(agents.filter(currAgent => currAgent._id!==agent))
      setAgent('');
    });
  };

  return (
    <div className="admin">
      <h1 className="admin__title">ADMIN PAGE</h1>
      <div className="admin__agent__form">
        <h2 className="admin__subtitle">Registrations</h2>
        <h4 className="admin__agent__select__helper">(Format : <b><u>Agent Name</u> — <u>Company Name</u> — <u>Phone Number</u> — <u>Email</u></b>)</h4>
        <div className="admin__agent__select">
          <FormControl id="reg__form" variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">
              Pending Requests
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={agent}
              onChange={handleAgentChange}
              label="Registered Agents"
              defaultValue={agent}
            >
                <MenuItem value={""}>Select...</MenuItem>
              {agents.map((agent) => (
                <MenuItem disabled={agent.done} key={agent._id} value={agent._id}>
                  {agent.name} - {agent.company} - {agent.phone} - {agent.email}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Button
          disabled={agent == ""}
          variant="contained"
          onClick={handleApproval}
          color="primary"
        >
          Approve
        </Button>
      </div>
      <div>{/* <h2 className="admin__subtitle">Registrations</h2> */}</div>
    </div>
  );
}

export default AdminPage;
