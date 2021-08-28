import React, { useEffect, useState } from "react";
import "./SearchTickets.css";
import axios from "../axios";
import {
    Button,
    Checkbox,
    FormControlLabel,
    Modal,
    TextField,
} from "@material-ui/core";
import { useStateValue } from "../data/StateProvider";
import { DataGrid } from "@material-ui/data-grid";

function SearchTickets() {
    const [state] = useStateValue();
    const [rows, setRows] = useState([]);

    useEffect(() => {
        axios({
            method: "get",
            url: "api/tickets",
            headers: { "Access-Control-Allow-Origin": "*" },
        })
            .then((res) => {
                setRows(
                    res.data.map((item) => {
                        return {
                            id: item._id,
                            airline: item.airline,
                            flightNo: item.flightNo,
                            pnr: item.pnr,
                            from: item.from,
                            to: item.to,
                            bookings: item.bookings,
                            departure: item.departure,
                            arrival: item.arrival,
                            stops: item.stops,
                            price: item.price,
                            hotDeal: item.hotDeal,
                            noOfTickets: item.noOfTickets,
                        };
                    })
                );
            })
            .catch((err) => console.error(err));
    }, [setRows]);

    const columns = [
        {
            field: "airline",
            headerName: "Airline",
            width: 150,
            valueFormatter: ({ value }) => state.flights[value][0],
        },
        {
            field: "flightNo",
            headerName: "Flight No.",
            width: 140,
        },
        {
            field: "pnr",
            headerName: "PNR",
            width: 110,
            editable: true,
        },
        {
            field: "from",
            headerName: "From",
            width: 120,
        },
        {
            field: "to",
            headerName: "To",
            width: 110,
        },
        {
            field: "departure",
            headerName: "Departure",
            width: 150,
            valueFormatter: ({ value }) =>
                new Date(value).toLocaleDateString("en-GB") +
                "  \t  " +
                new Date(value)
                    .toLocaleTimeString("en-US", { hour12: false })
                    .slice(0, 5),
        },
        {
            field: "arrival",
            headerName: "Arrival",
            width: 150,
            valueFormatter: ({ value }) =>
                new Date(value).toLocaleDateString("en-GB") +
                "  \t  " +
                new Date(value)
                    .toLocaleTimeString("en-US", { hour12: false })
                    .slice(0, 5),
        },
        {
            field: "stops",
            headerName: "No. of Stops",
            width: 170,
            valueFormatter: ({ value }) =>
                value === 0
                    ? "Non-Stop"
                    : value === 1
                    ? "One-Stop"
                    : "Two-Stop",
        },
        {
            field: "price",
            headerName: "Price",
            width: 120,
            valueFormatter: ({ value }) => `₹ ${value}`,
            editable: true,
        },
        {
            field: "hotDeal",
            headerName: "Hot Deals",
            width: 145,
            renderCell: (params) => (
                <div>
                    <Checkbox
                        checked={params.row.hotDeal}
                        onChange={(e) => {
                            axios({
                                method: "patch",
                                url: `api/tickets?type=updateHotDeal&id=${params.row.id}&hotDeal=${e.target.checked}`,
                                headers: { "Access-Control-Allow-Origin": "*" },
                            }).then((res) => {
                                setRows((curr) => {
                                    let newRows = [...curr];
                                    newRows.forEach((item) => {
                                        if (item.id === params.row.id) {
                                            item.hotDeal = !item.hotDeal;
                                        }
                                    });
                                    return newRows;
                                });
                            });
                        }}
                    />
                </div>
            ),
        },
        {
            field: "noOfTickets",
            headerName: "Available Tickets",
            width: 190,
            valueFormatter: ({ value }) => (value.toString()),
        },
        {
            field: "action",
            headerName: "Action",
            headerAlign: "center",
            width: 500,
            renderCell: (params) => (
                <TicketOperations
                    id={params.row.id}
                    rows={rows}
                    handleRowUpdate={(newRows) => setRows(newRows)}
                />
            ),
        },
    ];

    return (
        <div className="searchTickets">
            <h2 className="searchTickets__title">All Tickets</h2>
            <div style={{ height: 650, width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    rowHeight={80}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    onCellEditCommit={(params) => {
                        axios({
                            method: 'patch',
                            url: `api/tickets?type=updatePNR&id=${params.row.id}&pnr=${params.value}`,
                            headers: {"Allow-Control-Access-Origin": "*"}
                        }).then(res => {
                            axios({
                                method: 'patch',
                                url: `api/bookings?id=${params.row.id}&pnr=${params.value}`,
                                headers: { "Access-Control-Allow-Origin": "*" },
                            }).then(_ => {
                                alert(`PNR updated to ${params.value}`)
                            })
                        })
                    }}
                    // components={{
                    //   Toolbar: () =>(
                    //   <GridToolbarContainer>
                    //     <GridToolbarExport />
                    //   </GridToolbarContainer>
                    //   )
                    // }}
                />
            </div>
        </div>
    );
}

export default SearchTickets;

const TicketOperations = (props) => {
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [newPrice, setNewPrice] = useState("");
    const [disableUpdate, setDisableUpdate] = useState(false)
    const [disableDelete, setDisableDelete] = useState(false)
    const [disableBlock, setDisableBlock] = useState(false)

    const row = props.rows.filter((item) => item.id === props.id);

    const handlePriceUpdate = () => {
        if(newPrice){
            setDisableUpdate(true)
            axios({
                method: "patch",
                url: `api/tickets?type=updatePrice&id=${props.id}&price=${newPrice}`,
                headers: { "Access-Control-Allow-Origin": "*" },
            })
                .then((res) => {
                    let newRows = [...props.rows];
                    newRows.forEach((item) => {
                        if (item.id === props.id) {
                            item.price = res.data.price;
                        }
                    });
                    props.handleRowUpdate(newRows);
                    setNewPrice("")
                    setDisableUpdate(false)
                })
                .catch((err) => console.log(err));
        } else {
            alert("Please enter an amount first.")
        }
        
    };

    const handleTicketDelete = () => {
        setDisableDelete(true)
        axios({
            method: "delete",
            url: `api/bookings?tid=${props.id}`,
            headers: { "Access-Control-Allow-Origin": "*" },
        })
            .then((_) => {
                axios({
                    method: "delete",
                    url: `api/tickets?id=${props.id}`,
                    headers: { "Access-Control-Allow-Origin": "*" },
                }).then((__) => {
                    setOpen(false);
                    props.handleRowUpdate(
                        props.rows.filter((item) => item.id !== props.id)
                    );
                    setDisableDelete(false)
                });
            })
            .catch((err) => console.error(err));
    };

    const handleTicketBlock = () => {
        setDisableBlock(true)
        axios({
            method: "patch",
            url: `api/tickets?id=${props.id}&type=block`,
            headers: { "Access-Control-Allow-Origin": "*" },
        })
            .then((res) => {
                let newRows = [...props.rows];
                newRows.forEach((item) => {
                    if (item.id === props.id) {
                        item.noOfTickets = 0;
                    }
                });
                props.handleRowUpdate(newRows);
                setOpen2(false);
                setDisableBlock(false)
            })
            .catch((err) => console.error(err));
    };
    return (
        <div style={{width: '100%', display: "flex", alignItems: "center", justifyContent: "space-evenly"}}>
            <TextField
                className="ticketops__container__item"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value.replace(/[^0-9]+/g, ''))}
                variant="outlined"
                style={{maxWidth: '150px'}}
            />
            <Button
                className="ticketops__container__item"
                variant="contained"
                color="primary"
                onClick={handlePriceUpdate}
                disabled={disableUpdate}
            >
                UPDATE
            </Button>

            <Button
                variant="contained"
                color="secondary"
                onClick={() => setOpen2(true)}
            >
                BLOCK
            </Button>
            <Modal open={open2} onClose={() => setOpen(false)}>
                <div className="searchTickets__modal">
                    <p>
                        Are you sure you want to block this ticket?&nbsp;
                        {`This PNR still has ${row.noOfTickets} tickets.`}
                    </p>
                    <div className="searchTickets__modal__buttons">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setOpen2(false)}
                        >
                            No, Go Back
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleTicketBlock}
                            disabled={disableBlock}
                        >
                            Yes, Block
                        </Button>
                    </div>
                </div>
            </Modal>

            <Button
                variant="contained"
                color="secondary"
                onClick={() => setOpen(true)}
            >
                DELETE
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <div className="searchTickets__modal">
                    <p>
                        Are you sure you want to delete this ticket?&nbsp;
                        {row.bookings?.length
                            ? `This ticket already has ${row.bookings.length} bookings.`
                            : ""}
                    </p>
                    <div className="searchTickets__modal__buttons">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setOpen(false)}
                        >
                            No, Go Back
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleTicketDelete}
                            disabled={disableDelete}
                        >
                            Yes, Delete
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
