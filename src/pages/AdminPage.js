import React, { useState } from 'react';
import './AdminPage.css';
import {Tab, Tabs} from '@material-ui/core';
import UserApprovalForm from '../components/UserApprovalForm';
import TicketUploadForm from '../components/TicketUploadForm';
import SearchUsers from '../components/SearchUsers';
import SearchBookings from '../components/SearchBookings';
import TabPanel from '../components/TabPanel';
import SearchTickets from '../components/SearchTickets';

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
                <TabPanel value={tab} index={0}>
                    <Tabs variant="fullWidth" value={subtab} onChange={(e,t) => setSubtab(t)} aria-label="simple tabs example">
                      <Tab label="Approve Users" />
                      <Tab label="View User" />
                    </Tabs>
                    <TabPanel value={subtab} index={0}>
                        <UserApprovalForm/>
                    </TabPanel>
                    <TabPanel value={subtab} index={1}>
                        <SearchUsers/>
                    </TabPanel>
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <Tabs variant="fullWidth" value={subtab} onChange={(e,t) => setSubtab(t)} aria-label="simple tabs example">
                      <Tab label="Upload Ticket" />
                      <Tab label="Search Ticket" />
                      <Tab label="Updating PNR" />
                    </Tabs>
                    <TabPanel value={subtab} index={0}>
                        <TicketUploadForm/>
                    </TabPanel>
                    <TabPanel value={subtab} index={1}>
                        <SearchTickets/>
                    </TabPanel>
                </TabPanel>
                <TabPanel value={tab} index={2}>
                    <SearchBookings/>
                </TabPanel>
            </div>
        </div>
    )
}

export default AdminPage
