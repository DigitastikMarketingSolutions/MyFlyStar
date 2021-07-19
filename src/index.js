import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { StateProvider } from './data/StateProvider'
import { initialState, reducer } from './data/dataLayer'

ReactDOM.render(
    
        <StateProvider initialState={initialState} reducer={reducer}>
            <App/>
        </StateProvider>
    
    ,
    document.getElementById('root')
)