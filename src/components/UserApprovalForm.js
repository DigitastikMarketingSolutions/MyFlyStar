import React, { useEffect, useState } from "react";
import "./UserApprovalForm.css";
import { Button } from "@material-ui/core";
import axios from "../axios";
import { DataGrid } from "@material-ui/data-grid";

function UserApprovalForm() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        axios({
            method: "get",
            url: "api/users?type=pending",
            headers: { "Access-Control-Allow-Origin": "*" },
        }).then((res) => {
            setRows(
                res.data.map((user) => {
                    return {
                        id: user._id,
                        name: user.name,
                        company: user.company,
                        state: user.state,
                        phone: user.phone,
                        email: user.email,
                    };
                })
            );
        });
    }, [setRows]);

    const handleApproval = (phone) => {
        axios({
            method: "patch",
            url: `/api/users?phone=${phone}&type=approval`,
            headers: { "Access-Control-Allow-Origin": "*" },
        }).then((res) => {
            alert(res.data.message);
            setRows(rows.filter(item => item.phone !== phone))
        });
    };

    const handleRejection = (uid) => {
        axios({
            method: "delete",
            url: `/api/users?id=${uid}`,
            headers: { "Access-Control-Allow-Origin": "*" },
        }).then((res) => {
            alert("User Rejected");
            setRows(rows.filter(item => item.id !== uid))
        });
    };

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
          field: 'action',
          headerName: 'Action',
          renderCell: params => (
            <div style={{width:"100%", display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
                <Button variant="contained" color="primary" onClick={() => handleApproval(params.row.phone)}>Approve</Button>
                <Button variant="contained" color="secondary" onClick={() => handleRejection(params.row.id)}>Reject</Button>
            </div>
          ),
          width: 250,
          headerAlign: 'center',
          sortable: false,
          filterable: false,
          disableExport: true
        }
      ]

    return (
        <div className="admin__agent__form">
            <h2 className="admin__subtitle">Registrations</h2>
            <div style={{ height: 650, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    rowHeight={80}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                />
            </div>
        </div>
    );
}

export default UserApprovalForm;
