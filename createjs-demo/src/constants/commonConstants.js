// maximum width and height of the game canvas in pixels
const canvasMaxWidth = 1280;
const canvasMaxHeight = canvasMaxWidth * 0.5625;

// player configs
// initial player resources
const maxHP = 50;
const initRockets = 3;
const playerXPos = canvasMaxWidth * 0.05;   // player default x-pos
const playerHeight = 5;                     // players sprite height in pixels
const playerScale = 5;                      // player scaling factor
const playerMovementSpeed = 10;             // players y-movement speed
const mainWeaponDmg = 1;                    // shooting damage
const rocketDmg = 3;                        // rocket damage

// default projectile speed
const projectileSpeed = 30;

// Frames per second
const FPS = 60;

// hit box size for enemy collision
const enemyHitBoxSize = 7; 

// speed that the background moves
const weedSpeed = -2;

// interval the game speeds up at
const gameSpeedUpInterval = 15000;

// initial enemy spawn rate
const initEnemySpawnRate = 1500;

// string tokens
const tokens = {
    playerDirection: {
        none: "NONE",
        up: "UP",
        down: "DOWN"
    },
    weapons: {
        main: "MAIN",
        rocket: "ROCKET"
    },
    sounds: {
        playerHit: "hurt",
        playerShoot: "shoot",
        rocket: "rocket",
        explosion: "explosion",
        gameOver: "gameover",
        healthPickup: "health",
        rocketPickup: "rocketpick"
    }
}

/**
 * @author Aleksi - handle movement of objects in arrays
 * @param {Array} objArray - array of gameobjects to be moved
 * @param {Object} stage - canvas stage
 * @param {Number} removePoint - point of removal from the canvas
 * @param {Function} onRemoval - optional function that takes one argument which is the gameobject that is removed
 * @returns {Array} modified object array, reassign to the old value
 */
const handleMovement = async (objArr, stage, removePoint, onRemoval = undefined) => {
    for (let i = objArr.length - 1; i >= 0; i--) {
        if (objArr[i] !== undefined) {
            if (!objArr[i].destroyed && ((objArr[i].speed > 0 && objArr[i].x <= removePoint) || (objArr[i].speed < 0 && objArr[i].x >= removePoint))) {
                objArr[i].x += objArr[i].speed;
                if(objArr[i].ySpeed !== undefined){
                    if((objArr[i].yInit + objArr[i].yConstraint < objArr[i].y && objArr[i].ySpeed > 0)
                    ||
                    (objArr[i].yInit + objArr[i].yConstraint > objArr[i].y && objArr[i].ySpeed < 0)){
                
                        objArr[i].yConstraint = -objArr[i].yConstraint;
                        objArr[i].ySpeed = -objArr[i].ySpeed;
                    }
                    objArr[i].y += objArr[i].ySpeed;
                }
            } else {
                await stage.removeChild(objArr[i]);
                if (onRemoval != undefined && !objArr[i].removed) {
                    objArr[i].removed = true;
                    onRemoval(objArr[i]);
                }

                await objArr.splice(i, 1);
                break;
            }
        }
    }
    return objArr;
}

/**
 * @author Aleksi - constant variables through the app
 */
module.exports = {
    canvasMaxWidth,
    canvasMaxHeight,
    maxHP,
    initRockets,
    playerXPos,                     
    playerHeight,                 
    playerScale,                   
    playerMovementSpeed,   
    projectileSpeed,
    mainWeaponDmg,               
    rocketDmg,              
    enemyHitBoxSize,
    weedSpeed,
    FPS,
    gameSpeedUpInterval,
    initEnemySpawnRate,
    tokens,
    handleMovement
}