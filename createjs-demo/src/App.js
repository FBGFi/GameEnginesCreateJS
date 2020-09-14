import React, { Component } from 'react';
import './App.css';

import Header from './components/Header';
import Game from "./Game";
import {Constants} from "./constants/commonConstants";

const commonConstants = new Constants();

const createjs = window.createjs;

class App extends Component {
  state = {
    scaleFactor: 1
  }
  componentDidMount() {
    window.addEventListener('resize', () => {
      if(window.innerWidth < commonConstants.canvasMaxWidth){ 
        this.setState({ ...this.state, ...{ scaleFactor: commonConstants.scaleFactor() } });
      }
    });
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
