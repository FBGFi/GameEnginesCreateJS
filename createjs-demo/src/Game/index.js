import React, { Component } from "react";

import './Game.css';

import { GameController } from "./controllers/GameController";
import { UIController } from "./controllers/UIController";

import Constants from "../constants/commonConstants";

class Game extends Component {
    state = {
        scaleFactor: 1,
        // missiles: 10,
        // uiHeight: 50,
        // uiFontSize: 25,
        // uiHealthbar: {
        //     x: 500,
        //     y: 5,
        //     width: 300,
        //     height: 40
        // },
        // currHP: 30,
        // uiHealthbarX: 5,
        // uiHealthbarY: 5,
        // uiHealthbarSize: 300,
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.stage = new window.createjs.Stage("game-stage");
        this.uiController = new UIController();
        this.gameController = new GameController(this.stage);

        this.uiController.drawUI();

        window.addEventListener('resize', () => {
            if (window.innerWidth < Constants.canvasMaxWidth || this.state.scaleFactor !== 1) {
                this.setState({ ...this.state, ...{ scaleFactor: Constants.scaleFactor() } });
            }
        });
        


        // var canvas = document.getElementById("game-stage");
        // var ctx = canvas.getContext("2d");
        // ctx.moveTo(0, this.state.uiHeight);
        // ctx.lineTo(canvas.width, this.state.uiHeight);
        // ctx.font = `${this.state.uiFontSize}px Arial`;
        // ctx.fillText(`Health left: ${this.state.currHP}/${Constants.maxHP} Missiles remaining: ${this.state.missiles}`, 10, (this.state.uiHeight/2+this.state.uiFontSize/2));
        // // ctx.fillStyle = "blue"
        // // ctx.rect(300, 5, this.state.uiHealthbarSize, 40);
        
        // // pohjalle musta suorakulmio
        // // ctx.fillStyle = "black";
        // // ctx.fillRect(this.state.uiHealthbar.x, this.state.uiHealthbar.y, this.state.uiHealthbar.width, this.state.uiHealthbar.height);
        
        // // // päälle punainen suorakulmio kuvaamaan healthremaining
        // // ctx.fillStyle = "red";
        // // ctx.fillRect(this.state.uiHealthbar.x, this.state.uiHealthbar.y, this.state.uiHealthbar.width * (this.state.currHP/Constants.maxHP), this.state.uiHealthbar.height);
        // ctx.stroke();
        
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