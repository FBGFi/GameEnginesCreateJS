import React, { Component } from 'react';
import './App.css';

import Header from './components/Header';
import Game from "./Game";

const createjs = window.createjs;

class App extends Component {
  state = {
  }
  render() {
    return (
      <div className="App">
        <Game />
      </div>
    );
  }
}

export default App;
