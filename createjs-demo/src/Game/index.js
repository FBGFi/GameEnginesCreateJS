import React, {Component} from "react";

import './Game.css';

import Constants from "../constants/commonConstants";

class Game extends Component{
    state = {
        scaleFactor: 1
    }

    constructor(props){
        super(props)
    }

    componentDidMount(){       
        window.addEventListener('resize', () => {
            if(window.innerWidth < Constants.canvasMaxWidth){ 
            this.setState({ ...this.state, ...{ scaleFactor: Constants.scaleFactor() } });
            }
        });
    }

    render(){
        return(
            <div className="Game">
                <canvas style={{width: Constants.canvasMaxWidth, transform: `scale(${this.state.scaleFactor})`}} />
            </div>
        );
    }
}

export default Game;