import React from 'react';
import './App.scss';
import { Grid } from '@material-ui/core'
import Sidebar from './HOC/Sidebar'
import Content from './HOC/Content'


function App() {
  return (
    <Grid container className="root" >
      <Sidebar/>
      <Content />      
    </Grid>
  );
}

export default App;
