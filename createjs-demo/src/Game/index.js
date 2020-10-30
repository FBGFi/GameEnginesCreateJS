import React, { Component } from "react";

import './Game.css';

import Ui from "../components/Ui"
import { GameController } from "./controllers/GameController";

import Constants from "../constants/commonConstants";

const initState = {
    scaleFactor: 1,
    hpLeft: Constants.maxHP,
    rocketsLeft: Constants.initRockets,
    score: 0,
    startState: false,
    scaleFactor: 1
}

class Game extends Component {
    state = initState;

    updateUi = (obj) => {
        this.setState({ ...this.state, ...obj });
        if (this.state.hpLeft <= 0) {
            this.gameController.handleGameOver();
        }
    }

    /**
     * @author Aleksi - deal damage to the player
     * @param {Number} amount - amount of the damage dealt
     */
    changeHP = (amount) => {
        let hpLeft = this.state.hpLeft + amount;
        if(hpLeft > Constants.maxHP){
            hpLeft = Constants.maxHP;
        }
        this.updateUi({ hpLeft: hpLeft })
    }

    addScore = (amount) => {
        this.updateUi({score: this.state.score + amount})
    }

    startGame = () => {
        this.setState({...initState, ...{startState: true}});
        this.stage = new window.createjs.Stage(this.canvasRef);
        this.gameController = new GameController(this.stage, this.canvasRef, this.uiRef, this.updateUi, this.changeHP, this.addScore);
    }

    componentDidMount(){
        window.addEventListener('resize', () => {
            let scaleFactor = Constants.scaleFactor();
            if(scaleFactor != this.state.scaleFactor){
                this.setState({...this.state, ...{scaleFactor: scaleFactor}});
            }
        });
    }

    render() {
        return (
            <div className="Game" style={{ maxWidth: Constants.canvasMaxWidth }}> 
                <Ui scaleFactor={this.state.scaleFactor} width={this.state.hpLeft / Constants.maxHP} startState={this.state.startState} start={this.startGame} healthRemaining={this.state.hpLeft} healthMax={Constants.maxHP} rocketsRemaining={this.state.rocketsLeft} uiHeight={Constants.canvasMaxHeight} score={this.state.score} />
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