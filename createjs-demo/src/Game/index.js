import React, { Component } from "react";

import './Game.css';

import { GameController } from "./controllers/GameController";
import Constants from "../constants/commonConstants";

class Game extends Component {
    state = {
        scaleFactor: 1,
        missiles: 10
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

        var canvas = document.getElementById("testicanvas");
        var ctx = canvas.getContext("2d");
        ctx.moveTo(0, 20);
        ctx.lineTo(200, 20);
        ctx.font = "10px Arial";
        ctx.fillText(`Health left: ${Constants.maxHP} Missiles remaining: ${this.state.missiles}`, 10, 16);
        ctx.stroke();

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