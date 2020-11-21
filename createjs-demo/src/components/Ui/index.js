import React, { useEffect, useState, useRef } from "react";

import "./Ui.css"
import rocketImage from '../../Game/sprites/rocket.png';
import rocketPickup from "../../Game/sprites/rocket_pickup.png";
import healthPickup from "../../Game/sprites/health_pickup.png";

const Ui = (props) => {
    const [menu, setMenu] = useState(null);
    const menuRef = useRef(null);

    let hpWidth = `calc(100% * ${props.width})`;
    let fillClassName = props.width <= 0.2 ? 'fill flashing' : 'fill';

    // scaling of the menu
    let scaleFactor = 1 - ((1 - props.scaleFactor) / 2)
    let scale = (50 - 50 * scaleFactor);

    const showInstructions = () => {
        setMenu(
            <div ref={menuRef} className='menu' style={{ transform: `scale(${scaleFactor}) translate(${-50 - scale}%, ${-50 - scale}%)` }}>
                <div>
                    <div>
                        <span>↑</span>
                        <span>↓</span>
                        <p>Move</p>
                    </div>
                    <div>
                        <span>Space</span>
                        <p>Shoot laser</p>
                    </div>
                    <div>
                        <span>R</span>
                        <p>Shoot rocket</p>
                    </div>
                    <div>
                        <img src={healthPickup} />
                        <p>HP pickup</p>
                    </div>
                    <div>
                        <img src={rocketPickup} />
                        <p>Rocket pickup</p>
                    </div>
                </div>
                <button onClick={() => setMenu(baseMenu)}>Return</button>
            </div>
        );
    }

    let gameScreen = props.startState ?
        <div>
            <h2>Game Over!</h2>
            <h2>Your score is {props.score}!</h2>
            {props.score == 0 ? <h2>You suck!</h2> : null}
            <button onClick={() => props.start()}>Restart Game</button>
            <button onClick={showInstructions}>How to Play</button>
            <button onClick={() => window.close()}>Quit Game</button>
        </div>
        :
        <div>
            <h2>JS Impact</h2>
            <button onClick={() => props.start()}>Start Game</button>
            <button onClick={showInstructions}>How to Play</button>
            <button onClick={() => window.close()}>Quit Game</button>
        </div>;

    let baseMenu = <div ref={menuRef} className='menu' style={{ transform: `scale(${scaleFactor}) translate(${-50 - scale}%, ${-50 - scale}%)` }}>
        {gameScreen}
    </div>;

    const resizeMenu = () => {
        if(menuRef.current){
            menuRef.current.style.transform = `scale(${scaleFactor}) translate(${-50 - scale}%, ${-50 - scale}%)`;
        }
    }

    useEffect(() => {
        if (!props.startState || props.width <= 0) {
            setMenu(baseMenu);
        } else {
            setMenu(null);
        }
        window.addEventListener('resize', resizeMenu);
        return() => {
            window.removeEventListener('resize', resizeMenu);
        }
    }, [props.width, props.startState]);

    useEffect(() => {
        resizeMenu();
    }, [props.scaleFactor])

    return (
        <div className='Ui'>
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