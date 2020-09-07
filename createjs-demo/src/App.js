import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './components/Header';

class App extends Component {
  state = {
    numero: 0
  }
  render() {
    return (
      <div className="App">
        <Header teksti="Tää on headeri" muuttuja={this.state.numero} />
      </div>
    );
  }
}

export default App;
