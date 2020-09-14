import React, {Component} from "react";


class Game extends Component{
    state = {
        lives: 3
    }

    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="Game">
                <canvas />
            </div>
        );
    }
}

export default Game;