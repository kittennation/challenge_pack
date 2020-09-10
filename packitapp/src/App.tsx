import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { Container, Grid } from '@material-ui/core'
import Sidebar from './HOC/Sidebar'


function App() {
  return (
    <Grid container className="root" >
      <Sidebar/>
      
      <Grid item md>0</Grid>
      
    </Grid>
  );
}

export default App;
