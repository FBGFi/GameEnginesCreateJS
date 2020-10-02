import React from "react";

import "./Ui.css"
import rocketImage from '../../Game/sprites/rocket.png'

const Ui = (props) => {
    let hpWidth = `calc(100% * ${props.width})`;
    let fillClassName = props.width <= 0.2 ? 'fill flashing' : 'fill';

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
                {props.width <= 0 ? <div><h1>Game Over!</h1><button onClick={() => props.restart()}>Restart Game</button></div> : null}
            </div>
        </div>
    )
}

export default Ui