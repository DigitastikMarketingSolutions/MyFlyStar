import React, { useEffect, useState } from 'react'
import axios from '../axios'

import './ProfilePage.css'
import bgImage from "../images/Background1.png";
import agentImage from '../images/profile-placeholder.jpg'
import { Grid, Paper, Popper, Typography } from '@material-ui/core';
import { useStateValue } from '../data/StateProvider';
import { PhotoCamera } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

function ProfilePage() {

    const history = useHistory()

    const [agent, setAgent] = useState({})
    const [anchorEl, setAnchorEl] = useState(null)
    const [image, setImage] = useState(agentImage)
    const [{user}, dispatch] = useStateValue()

    useEffect(() => {
        if(user){
            axios({
                method: 'get',
                url: `api/users/${user.email}`
            }).then(res => {
                setAgent(res.data)
            })
        } else{
            history.push('/')
        }
    })

    const handleFileUpload = () => {
    
        // Create an object of formData
        const formData = new FormData();
      
        // Update the formData object
        formData.append(
          "myFile",
          this.state.selectedFile,
          this.state.selectedFile.name
        );
      
        // Details of the uploaded file
        console.log(this.state.selectedFile);
      
        // Request made to the backend api
        // Send formData object
        axios.post("api/user/uploadfile", formData);
      };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const handlePopperToggle = (e) => {
        setAnchorEl(anchorEl ? null : e.currentTarget)
    }

    return (
        <div className="profile">
            <div className="profile__bgImage">
              <img src={bgImage} alt="" />
            </div>
            <h1 className="profile__title">
                Your Profile
            </h1>
            <div className="profile__section" >
                <div className="profile__section__images">
                    <div className="profile__section__image">
                        <img src={image} alt=""/>
                        <div className="profile__section__images__upload" onMouseOver={handlePopperToggle}>
                            <PhotoCamera fontSize="small"/>
                            <Popper id={id} open={open} anchorEl={anchorEl}>
                              <span>Upload image</span>
                            </Popper>
                        </div>
                    </div>
                </div>
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
