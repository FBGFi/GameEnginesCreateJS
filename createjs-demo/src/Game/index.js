import React, { Component } from "react";

import './Game.css';

import { GameController } from "./controllers/GameController";
import Constants from "../constants/commonConstants";

class Game extends Component {
    state = {
        scaleFactor: 1
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.stage = new window.createjs.Stage("game-stage");
        this.gameController = new GameController(this.stage);
        window.addEventListener('resize', () => {
            if (window.innerWidth < Constants.canvasMaxWidth || this.state.scaleFactor !== 1) {
                this.setState({ ...this.state, ...{ scaleFactor: Constants.scaleFactor() } });
            }
        });


    }

    render() {
        return (
            <div className="Game" style={{ maxWidth: Constants.canvasMaxWidth}}>
                <canvas 
                    ref={ref => this.canvasRef = ref} 
                    id="game-stage" 
                    width={Constants.canvasMaxWidth} 
                    height={Constants.canvasMaxWidth * 0.5625} 
                     />
            </div>
        );
    }
}

export default Game;