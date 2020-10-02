import React, { Component } from "react";

import './Game.css';

import Ui from "../components/Ui"
import { GameController } from "./controllers/GameController";

import Constants from "../constants/commonConstants";

const initState = {
    scaleFactor: 1,
    hpLeft: Constants.maxHP,
    rocketsLeft: Constants.initRockets,
}

class Game extends Component {
    state = initState;

    constructor(props) {
        super(props)
    }

    updateUi = (obj) => {
        this.setState({ ...this.state, ...obj });
        if (this.state.hpLeft <= 0) {
            this.gameController.handleGameOver();
        }
    }

    /**
     * @author Aleksi - deal damage to the player
     * @param {Number} amount -> amount of the damage dealt
     */
    dealDMG = (amount) => {
        this.updateUi({ hpLeft: this.state.hpLeft - amount })
    }

    startGame = () => {
        this.setState(initState);
        this.stage = new window.createjs.Stage(this.canvasRef);
        this.gameController = new GameController(this.stage, this.canvasRef, this.uiRef, this.updateUi, this.dealDMG);
    }

    componentDidMount() {
        this.startGame();
    }

    render() {
        return (
            <div className="Game" style={{ maxWidth: Constants.canvasMaxWidth }}> 
                <Ui width={this.state.hpLeft / Constants.maxHP} restart={this.startGame} healthRemaining={this.state.hpLeft} healthMax={Constants.maxHP} rocketsRemaining={this.state.rocketsLeft} uiHeight={Constants.canvasMaxHeight} />
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