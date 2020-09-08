import React, { Component } from 'react';
import './App.css';

import Header from './components/Header';

const createjs = window.createjs;
const easeljs = createjs.EaselJS;
const tweenjs = createjs.TweenJS;
const preloadjs = createjs.PreloadJS;
const soundjs = createjs.SoundJS;

class App extends Component {
  state = {
    numero: 0
  }
  render() {
    console.log('CreateJS:');
    console.log(createjs);
    console.log('EaselJS:');
    console.log(easeljs);
    console.log('TweenJS:');
    console.log(tweenjs);
    console.log('PreloadJS:');
    console.log(preloadjs);
    console.log('SoundJS:');
    console.log(soundjs);
    return (
      <div className="App">
        <Header teksti="Tää on headeri" muuttuja={this.state.numero} />
      </div>
    );
  }
}

export default App;
