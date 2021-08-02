import React, { useEffect, useState } from 'react'
import './UserApprovalForm.css'
import { FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core'
import axios from '../axios'

function UserApprovalForm() {
    const [agents, setAgents] = useState([])
    const [agent, setAgent] = useState([])

    useEffect(() => {
        axios({
          method: 'get',
          url: 'api/users?type=pending'
        })
        .then((res) => {
            setAgents(res.data)
        });
      }, []);

    const handleApproval = () => {
        const approvedAgent = agents.filter((item) => item._id === agent)[0];
        axios({
            method: "patch",
            url: `/api/users?phone=${approvedAgent.phone}&type=approval`
        }).then((res) => {
            alert(res.data.message);
            setAgents(agents.filter(currAgent => currAgent._id!==agent))
            setAgent('');
        });
    };

    return (
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
                  onChange={(e) => setAgent(e.target.value)}
                  label="Registered Agents"
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
    
    )
}

export default UserApprovalForm
