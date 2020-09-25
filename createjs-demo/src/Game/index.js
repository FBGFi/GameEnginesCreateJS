import React, { Component } from "react";

import './Game.css';

import Ui from "../components/Ui"
import { GameController } from "./controllers/GameController";

import Constants from "../constants/commonConstants";

class Game extends Component {
    state = {
        scaleFactor: 1,
        hpLeft: Constants.maxHP,
        rocketsLeft: Constants.initRockets,
    }

    constructor(props) {
        super(props)
    }

    updateUi = (obj) => {
        this.setState({...this.state, ...obj});
    }

    componentDidMount() {
        this.stage = new window.createjs.Stage(this.canvasRef);
        this.gameController = new GameController(this.stage,this.canvasRef,this.uiRef, this.updateUi);
        
        window.addEventListener('resize', () => {
            if (window.innerWidth < Constants.canvasMaxWidth || this.state.scaleFactor !== 1) {
                this.setState({ ...this.state, ...{ scaleFactor: Constants.scaleFactor() } });
            }
        });        
    }

    render() {
        return (
            <div className="Game" style={{ maxWidth: Constants.canvasMaxWidth}}>
                <Ui width={this.state.hpLeft / Constants.maxHP} healthRemaining={this.state.hpLeft} healthMax={Constants.maxHP} rocketsRemaining={this.state.rocketsLeft}/>

                <canvas
                    ref={ref => this.canvasRef = ref} 
                    width={Constants.canvasMaxWidth} 
                    height={Constants.canvasMaxHeight} 
                     />
            </div>
        );
    }
}

export default Game;