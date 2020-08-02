import React from 'react';
import logo from './logo.svg';
import './App.css';
import Scroller from './components/Scroller';
import Nav from './components/nav';
import { Container } from '@material-ui/core';
import AddPhotoButton from './components/Fab';

function App() {
  return (
    <div className="App">
      <Container>
        <Scroller />
        <AddPhotoButton />
      </Container>
    </div>
  );
}

export default App;