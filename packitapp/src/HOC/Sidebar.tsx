import React from 'react'
import { Grid } from '@material-ui/core'
import StyleIcon from '@material-ui/icons/Style'
import "./Sidebar.scss"

import { BriefFormContainer } from '../features/brief-form/BriefFormContainer'


function Sidebar() {
    
    return (
            <Grid item className="sidebar">
                <div className="header"><StyleIcon style={{ fontSize: 48, color: "white" }}/><span className="headerTitle">PACKITAPP</span></div>
                <BriefFormContainer/>
            </Grid>
        );
}

export default Sidebar