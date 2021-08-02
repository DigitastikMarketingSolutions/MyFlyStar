import React, { useEffect, useState } from 'react'
import axios from '../axios'

import './ProfilePage.css'
import bgImage from "../images/Background1.png";
import { useStateValue } from '../data/StateProvider';
import { useHistory } from 'react-router-dom';

function ProfilePage() {

    const history = useHistory()

    const [agent, setAgent] = useState({})
    const [{user}] = useStateValue()

    useEffect(() => {
        if(user){
            axios({
                method: 'get',
                url: `api/users?email=${user.email}`
            }).then(res => {
                setAgent(res.data)
            })
        } else{
            history.push('/')
        }
    })

    return (
        <div className="profile">
            <div className="profile__bgImage">
              <img src={bgImage} alt="" />
            </div>
            <div className="profile__section" >
                <h1 className="profile__section__title">
                    Your Profile
                </h1>
                <p className="profile__section__rows">
                    <span className="profile__section__rows__field">Name:</span>
                    <span className="profile__section__rows__value">{agent.name}</span>
                </p>
                <p className="profile__section__rows">
                    <span className="profile__section__rows__field">Agency:</span>
                    <span className="profile__section__rows__value">{agent.company}</span>
                </p>
                <p className="profile__section__rows">
                    <span className="profile__section__rows__field">State:</span>
                    <span className="profile__section__rows__value">{agent.state}</span>
                </p>
                <p className="profile__section__rows">
                    <span className="profile__section__rows__field">Phone:</span>
                    <span className="profile__section__rows__value">{agent.phone}</span>
                </p>
                <p className="profile__section__rows">
                    <span className="profile__section__rows__field">Email:</span>
                    <span className="profile__section__rows__value">{agent.email}</span>
                </p> 
            </div>
        </div>
    )
}

export default ProfilePage
