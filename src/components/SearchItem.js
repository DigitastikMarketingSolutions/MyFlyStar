import { Button, Card, Paper } from '@material-ui/core'
import React from 'react'

import './SearchItem.css'
import logo from '../spicejet.jpg'

function SearchItem() {
    return (
        <Card className="searchItem" elevation={12}>
            <img className="searchItem__image" src={logo} alt=""/>
            <p className="searchItem__details">
                <span>CCU / HYD</span>
                <span>Non-Stop</span>
                <span>03-08-2021</span>
                <span>13:45</span>
            </p>
            <Button className="searchItem__button" variant="contained" color="success">Book</Button>
        </Card>
    )
}

export default SearchItem
