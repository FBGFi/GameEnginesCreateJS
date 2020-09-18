import React, { Component } from "react";

import './Game.css';
import SVG from "../components/svg";

import Constants from "../constants/commonConstants";
import Sprites from "./sprites/sprites.js";

class Game extends Component {
    state = {
        scaleFactor: 1
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        window.addEventListener('resize', () => {
            if (window.innerWidth < Constants.canvasMaxWidth || this.state.scaleFactor !== 1) {
                this.setState({ ...this.state, ...{ scaleFactor: Constants.scaleFactor() } });
            }
        });
    }

    render() {
        return (
            <div className="Game" style={{ maxWidth: Constants.canvasMaxWidth}}>
                <canvas style={{ width: Constants.canvasMaxWidth, transform: `scale(${this.state.scaleFactor})` }} />
            </div>
        );
    }
}

export default Game;