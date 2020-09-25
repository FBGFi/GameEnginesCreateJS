import React from "react";

import "./Ui.css"
import rocketImage from '../../Game/sprites/rocket.png'

const Ui = (props) => {
    return(
        <div className='Ui'> 
            <div className="ui-top">
                <div className='ui-left'><img src={rocketImage} />{props.rocketsRemaining}</div>
                <div className='ui-right'>PISTEET</div>
                
            </div>
            <div className='health-bar'>
                <div className="fill" style={{width: `calc(100% * ${props.width})`}}></div>
                <p>HP: {props.healthRemaining}/{props.healthMax}</p>
            </div>
        </div>
    )
}

export default Ui