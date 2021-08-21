import axios from "../axios";
import React, { useEffect, useState } from "react";
import "./SearchUsers.css";
import { Button, Modal, TextField, Typography } from "@material-ui/core";
import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@material-ui/data-grid"

function SearchUsers() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "api/users?type=approved",
      headers: {"Access-Control-Allow-Origin": "*"}
    })
      .then((res) => {
        setRows(res.data.map(user => {
          return {id: user._id, name: user.name, company: user.company, state: user.state, phone:user.phone, email:user.email, balance: user.balance}
        }))
        console.log("Hi")
      })
      .catch((err) => console.error(err));
      console.log("Row Updated")
  }, [setRows]);
  // 18004191172
  // info@mediassist.in

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 250
    },
    {
      field: 'company',
      headerName: 'Agency',
      width: 250
    },
    {
      field: 'state',
      headerName: 'State',
      width: 120
    },
    {
      field: 'phone',
      headerName: 'Phone',
      type: 'string',
      valueFormatter: ({ value }) => `${value.slice(0,3)} ${value.slice(3,6)} ${value.slice(6)}`,
      width: 150,
      sortable: false
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      sortable: false
    },
    {
      field: 'balance',
      headerName: 'Balance',
      type: 'number',
      width: 150,
      headerAlign: 'left',
      align: 'left'
    },
    {
      field: 'addBalance',
      headerName: 'Add Balance',
      renderCell: params => (
        <BalanceAddElement balance={params.row.balance} uid={params.row.id} phone={params.row.phone} users={rows} handleUsersUpdate={(newRows) => {
          // console.log(newRows)
          setRows(newRows)
          console.log("Row Set!")
        }}/>
      ),
      width: 300,
      headerAlign: 'center',
      sortable: false,
      filterable: false,
      disableExport: true
    }
  ]

  return (
    <div className="searchUsers">
      <div style={{ height: 650, width: '90%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={80}
          pageSize={10}
          rowsPerPageOptions={[10]}
          components={{
            Toolbar: () =>(
            <GridToolbarContainer>
              <GridToolbarExport />
            </GridToolbarContainer>
            )
          }}
        />
      </div>
    </div>
  );
}

export default SearchUsers;


function BalanceAddElement(props) {
  const [amount, setAmount] = useState("")
  const handleBalanceAdd = () => {
      axios({
        method: 'patch',
        url: `api/users?phone=${props.phone}&type=balanceAdd&amount=${amount}`,
        headers: { "Access-Control-Allow-Origin": "*" },
      }).then(res => {
          let newRows = [...props.users]
          newRows.forEach(item => {
            if(item.id===props.uid){
              item.balance = res.data.balance
            }
          })
          props.handleUsersUpdate(newRows)
          setAmount("")
      })
  }
  return (
      <div style={{width:"100%", display: "flex", alignItems: "center", justifyContent: "space-evenly"}}>
          <TextField
            variant="filled"
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{maxWidth: '150px'}}
          />
          <Button variant="contained" onClick={handleBalanceAdd} color="primary">
            Add
          </Button>  
      </div>
  )
}