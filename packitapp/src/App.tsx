import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { Container, Grid } from '@material-ui/core'
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
