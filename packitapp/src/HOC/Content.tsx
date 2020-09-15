import * as React from 'react';
import './Content.scss'
import { Grid } from '@material-ui/core'
import { BriefListContainer } from '../features/briefs-list/BriefListContainer'

function Content() {
    
    return (
            <Grid item xs className="content">
                <BriefListContainer/>
            </Grid>
        );
}

export default Content