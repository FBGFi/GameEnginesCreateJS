import React from "react";

import "./Ui.css"
import rocketImage from '../../Game/sprites/rocket.png'

const Ui = (props) => {
    let hpWidth = `calc(100% * ${props.width})`;
    let fillClassName = props.width <= 0.2 ? 'fill flashing' : 'fill';

    let gameScreen = props.startState ?
        <div>
            <h2>Game Over!</h2>
            <h2>Your score is {props.score}!</h2>
            {props.score == 0 ? <h2>You suck!</h2> : null}
            <button onClick={() => props.start()}>Restart Game</button>
            <button onClick={() => window.close()}>Quit Game</button>
        </div>
        :
        <div>
            <h2>JS Impact</h2>
            <button onClick={() => props.start()}>Start Game</button>
            <button onClick={() => window.close()}>Quit Game</button>
        </div>
    let scaleFactor = 1 - ((1 - props.scaleFactor) / 2)
    let scale = (50 - 50 * scaleFactor);
    let menu = !props.startState || props.width <= 0 ? 
    <div className='menu' style={{transform: `scale(${scaleFactor}) translate(${-50 - scale}%, ${-50 - scale}%)`}}>
        {gameScreen}
    </div> : null;
    return (
        <div className='Ui'>
            {/* placeholder to restart the game */}

            <div className="ui-top">
                <div className='ui-left'><img src={rocketImage} />{props.rocketsRemaining}</div>
                <div className='ui-right'>{props.score}</div>

            </div>
            <div className='health-bar'>
                <p>HP: {props.healthRemaining <= 0 ? 0 : props.healthRemaining}/{props.healthMax}</p>
                <div className={fillClassName} style={{ width: hpWidth }}>
                    <p>HP: {props.healthRemaining <= 0 ? 0 : props.healthRemaining}/{props.healthMax}</p>
                </div>
            </div>
            {menu}
        </div>
    )
}

export default Ui