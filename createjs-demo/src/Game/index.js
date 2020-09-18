import React, { Component } from "react";

import './Game.css';

import { GameController } from "./controllers/GameController";
import { UIController } from "./controllers/UIController";

import Constants from "../constants/commonConstants";

class Game extends Component {
    state = {
        scaleFactor: 1
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.stage = new window.createjs.Stage(this.canvasRef);
        this.gameController = new GameController(this.stage,this.canvasRef);
        
        // ui ei toimi koska stage.update() game controllerissa
        this.uiController = new UIController(this.canvasRef);
        this.uiController.drawUI();
        
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
                    width={Constants.canvasMaxWidth} 
                    height={Constants.canvasMaxHeight} 
                     />
            </div>
        );
    }
}

export default Game;