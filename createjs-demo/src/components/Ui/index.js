import React from "react";

import "./Ui.css"
import rocketImage from '../../Game/sprites/rocket.png'

const Ui = (props) => {
    let hpWidth = `calc(100% * ${props.width})`;
    let fillClassName = props.width <= 0.2 ? 'fill flashing' : 'fill';

    let restartGameScreen = <div><h1>Game Over!</h1><h1>Your score is {props.score}!</h1><button onClick={() => props.start()}>Restart Game</button></div>
    let startGameScreen = <div><h1>JS Impact</h1><button onClick={() => props.start()}>Start Game</button></div>

    return (
        <div className='Ui'>
            {/* placeholder to restart the game */}

            <div className="ui-top">
                <div className='ui-left'><img src={rocketImage} />{props.rocketsRemaining}</div>
                <div className='ui-right'>{props.score}</div>

            </div>
            <div className='health-bar'>
                <div className={fillClassName} style={{ width: hpWidth }}></div>
                <p>HP: {props.healthRemaining <= 0 ? 0 : props.healthRemaining}/{props.healthMax}</p>
            </div>
            <div className='restart-game'>
                {props.startState == false ? startGameScreen : props.width <= 0 ? restartGameScreen : null}
            </div>
        </div>
    )
}

export default Ui