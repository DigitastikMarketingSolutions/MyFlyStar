import React, { useEffect, useState } from "react";
import "./SearchTickets.css";
import axios from "../axios";
import { Button, Checkbox, FormControlLabel, Modal, TextField } from "@material-ui/core";
import { useStateValue } from "../data/StateProvider";

function SearchTickets() {
    const [state] = useStateValue();
    const [tickets, setTickets] = useState([]);
    const [open, setOpen] = useState(false);
    const [ticket, setTicket] = useState({});
    const [hotDeal, setHotDeal] = useState(!!ticket.hotDeal)

    useEffect(() => {
        axios({
            method: "get",
            url: "api/tickets",
            headers: { "Access-Control-Allow-Origin": "*" },
        })
            .then((res) => {
                setTickets(res.data);
            })
            .catch((err) => console.error(err));
    }, [setTickets, ticket.hotDeal]);

    return (
        <div className="searchTickets">
            <h2 className="searchTickets__title">All Tickets</h2>
            {console.log(tickets)}
            {tickets.length
                ? tickets
                      .sort((a, b) => a?.departure - b?.departure)
                      .map((item) => {
                          return (
                              <div
                                  key={item?._id}
                                  className="searchTickets__ticket"
                              >
                                  <span>
                                      <b>Airlines</b>
                                      <br />
                                      {item.airline
                                          ? state.flights[item.airline][0]
                                          : null}
                                  </span>
                                  <span>
                                      <b>Flight No.</b>
                                      <br />
                                      {item?.flightNo}
                                  </span>
                                  <span>
                                      <b>PNR</b>
                                      <br />
                                      {item?.pnr}
                                  </span>
                                  <span>
                                      <b>Date</b>
                                      <br />
                                      {new Date(
                                          item?.departure
                                      ).toLocaleDateString("en-GB")}
                                  </span>
                                  <span>
                                      <b>Sector</b>
                                      <br />
                                      {item?.from + " / " + item?.to}
                                  </span>
                                  <Button
                                      variant="outlined"
                                      color="default"
                                      onClick={() => {
                                          setTicket(item);
                                          setOpen(true);
                                      }}
                                  >
                                      View
                                  </Button>
                                  <Modal
                                      open={open}
                                      onClose={() => {
                                          setOpen(false);
                                          setTicket({});
                                      }}
                                  >
                                      <div className="searchTickets__modal">
                                          <div className="searchTickets__modal__header">
                                              <img
                                                  src={
                                                      ticket.airline
                                                          ? state.flights[
                                                                ticket.airline
                                                            ][1]
                                                          : null
                                                  }
                                                  alt=""
                                              />
                                              <h1>
                                                  {ticket.airline
                                                      ? state.flights[
                                                            ticket?.airline
                                                        ][0]
                                                      : null}
                                              </h1>
                                              <FormControlLabel
                                                  control={
                                                      <Checkbox
                                                          checked={
                                                              hotDeal
                                                          }
                                                          onChange={(e) => {
                                                              setHotDeal(curr => !curr)
                                                              axios({
                                                                  method: 'patch',
                                                                  url: `api/tickets?type=updateHotDeal&id=${ticket._id}&hotDeal=${e.target.checked}`
                                                              }).then(res => {
                                                                  setTicket(res.data)
                                                              })
                                                          }}
                                                          color="primary"
                                                      />
                                                  }
                                                  label="Hot Deal(?)"
                                              />
                                          </div>
                                          <div className="searchTickets__modal__body">
                                              <div className="searchTickets__modal__body__left">
                                                  <span>
                                                      Flight No.:{" "}
                                                      {ticket?.flightNo}
                                                  </span>
                                                  <span>
                                                      PNR: {ticket?.pnr}
                                                  </span>
                                                  <span>
                                                      No. of Stops:{" "}
                                                      {ticket?.stops === 0
                                                          ? "Non-Stop"
                                                          : ticket.stops === 1
                                                          ? "One-Stop"
                                                          : "Two-Stop"}
                                                  </span>
                                                  <span>
                                                      Available Tickets:{" "}
                                                      {ticket?.noOfTickets}
                                                  </span>
                                              </div>
                                              <div className="searchTickets__modal__body__right">
                                                  <span>
                                                      Sector:{" "}
                                                      {ticket?.from +
                                                          " / " +
                                                          ticket.to}
                                                  </span>
                                                  <span>
                                                      Departure:{" "}
                                                      {new Date(
                                                          ticket?.departure
                                                      ).toLocaleDateString(
                                                          "en-GB"
                                                      )}
                                                      &nbsp;&nbsp;&nbsp;&nbsp;
                                                      <u>
                                                          {new Date(
                                                              ticket?.departure
                                                          )
                                                              .toLocaleTimeString(
                                                                  "en-US",
                                                                  {
                                                                      hour12: false,
                                                                  }
                                                              )
                                                              .slice(0, 5)}
                                                      </u>
                                                  </span>
                                                  <span>
                                                      Arrival:{" "}
                                                      {new Date(
                                                          ticket?.arrival
                                                      ).toLocaleDateString(
                                                          "en-GB"
                                                      )}
                                                      &nbsp;&nbsp;&nbsp;&nbsp;
                                                      <u>
                                                          {new Date(
                                                              ticket?.arrival
                                                          )
                                                              .toLocaleTimeString(
                                                                  "en-US",
                                                                  {
                                                                      hour12: false,
                                                                  }
                                                              )
                                                              .slice(0, 5)}
                                                      </u>
                                                  </span>
                                                  <span>
                                                      Price: Rs. {ticket?.price}
                                                  </span>
                                              </div>
                                          </div>
                                          <TicketOperations
                                              ticket={ticket}
                                              handleModal={setOpen}
                                              handleCallback={setTicket}
                                          />
                                      </div>
                                  </Modal>
                              </div>
                          );
                      })
                : "No tickets yet"}
        </div>
    );
}

export default SearchTickets;

const TicketOperations = (props) => {
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [newPrice, setNewPrice] = useState("");

    const handlePriceUpdate = () => {
        axios({
            method: "patch",
            url: `api/tickets?type=updatePrice&id=${props.ticket._id}&price=${newPrice}`,
        })
            .then((res) => {
                props.handleCallback(res.data);
                setNewPrice("");
            })
            .catch((err) => console.log(err));
    };

    const handleTicketDelete = () => {
        axios({
            method: "delete",
            url: `api/bookings?tid=${props.ticket._id}`,
        })
            .then((_) => {
                axios({
                    method: "delete",
                    url: `api/tickets?id=${props.ticket._id}`,
                }).then((__) => {
                    setOpen(false);
                    props.handleModal(false);
                });
            })
            .catch((err) => console.error(err));
    };

    const handleTicketBlock = () => {
        axios({
            method: "patch",
            url: `api/tickets?id=${props.ticket._id}&type=block`,
        })
            .then(res => {
                props.handleCallback(res.data)
                setOpen2(false);
            })
            .catch((err) => console.error(err));
    };
    return (
        <div className="ticketops">
            <div className="ticketops__container">
                <TextField
                    className="ticketops__container__item"
                    size="small"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    variant="filled"
                    label="Update Price"
                />
                <Button
                    className="ticketops__container__item"
                    variant="contained"
                    color="primary"
                    onClick={handlePriceUpdate}
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
                            {`This PNR still has ${props.ticket?.noOfTickets} tickets.`}
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
                            Are you sure you want to delete this ticket?{" "}
                            {props.ticket?.bookings?.length
                                ? `This ticket already has ${props.ticket?.bookings.length} bookings.`
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
                            >
                                Yes, Delete
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
};
