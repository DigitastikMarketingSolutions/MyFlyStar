import spicejetLogo from '../images/spicejet.jpg'
import indigoLogo from '../images/indigo.jpg'
import airasiaLogo from '../images/airasia.png'
import airindiaLogo from '../images/airindia.png'
import drukairLogo from '../images/drukair.jpg'
import vistaraLogo from '../images/vistara.png'
import goairLogo from '../images/goair.jpg'

export const initialState = {
    user: null,
    flights: {
        'AI': ["Air India", airindiaLogo],
        'I5': ["Air Asia", airasiaLogo],
        'KB': ["Druk Air", drukairLogo],
        'G8': ["Go Air", goairLogo],
        '6E': ["Indigo Airlines", indigoLogo],
        'SG': ["SpiceJet", spicejetLogo],
        'UK': ["Vistara", vistaraLogo],
    },
    ticket: null
}

export const reducer = (state, action) => {
    switch(action.type){
        case 'SET_USER':
            return {...state, user: action.user}
        case 'SET_TICKET':
            return {...state, ticket: action.ticket}
        default:
            return {...state}
    }
}