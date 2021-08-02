import React, { useState } from 'react';
import './AdminPage.css';
import {Tab, Tabs} from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import UserApprovalForm from '../components/UserApprovalForm';
import UserBalanceAddForm from '../components/UserBalanceAddForm';
import TicketUploadForm from '../components/TicketUploadForm';
import PNRUpdateForm from '../components/PNRUpdateForm';
import SearchUsers from '../components/SearchUsers';
import SearchTickets from '../components/SearchTickets';
import SearchBookings from '../components/SearchBookings';

function AdminPage() {
    const [tab, setTab] = useState(0)
    const [subtab, setSubtab] = useState(0)
    return (
        <div className="admin">
            <h1 className="admin__title">ADMIN PAGE</h1>
            <div className="admin__container">
                <Tabs variant="fullWidth" value={tab} onChange={(e,t) => setTab(t)} aria-label="simple tabs example">
                  <Tab label="Users" />
                  <Tab label="Tickets" />
                  <Tab label="Bookings" />
                </Tabs>
                <SwipeableViews axis="x" index={tab} onChangeIndex={i => setTab(i)}>
                    <div className="admin__container__view">
                        <Tabs variant="fullWidth" value={subtab} onChange={(e,t) => setSubtab(t)} aria-label="simple tabs example">
                          <Tab label="Approve Users" />
                          <Tab label="View User" />
                          <Tab label="Add Balance" />
                        </Tabs>
                        <SwipeableViews axis="x" index={subtab} onChangeIndex={i => setSubtab(i)}>
                            <div className="admin__container__subview">
                                <UserApprovalForm/>
                            </div>
                            <div className="admin__container__subview">
                                <SearchUsers/>
                            </div>
                            <div className="admin__container__subview">
                                <UserBalanceAddForm/>
                            </div>
                        </SwipeableViews>
                    </div>
                    <div className="admin__container__view">
                        <Tabs variant="fullWidth" value={subtab} onChange={(e,t) => setSubtab(t)} aria-label="simple tabs example">
                          <Tab label="Upload Ticket" />
                          <Tab label="Search Ticket" />
                          <Tab label="Updating PNR" />
                        </Tabs>
                        <SwipeableViews  axis="x" index={subtab} onChangeIndex={i => setSubtab(i)}>
                            <div className="admin__container__subview">
                                <TicketUploadForm/>
                            </div>
                            <div className="admin__container__subview">
                                <SearchTickets/>
                            </div>
                            <div className="admin__container__subview">
                                <PNRUpdateForm/>
                            </div>
                        </SwipeableViews>
                    </div>
                    <div className="admin__container__view">
                        <SearchBookings/>
                    </div>
                </SwipeableViews>
            </div>
        </div>
    )
}

export default AdminPage
