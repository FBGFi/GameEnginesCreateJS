const canvasMaxWidth = 1280;
const canvasMaxHeight = canvasMaxWidth * 0.5625;
const maxHP = 50;
const initRockets = 3;
const playerXPos = canvasMaxWidth * 0.05;
const playerMovementSpeed = 10;
const mainWeaponDmg = 1;
const rocketDmg = 3;
const projectileSpeed = 30;
const FPS = 60;
const playerHeight = 5;
const playerScale = 5;
const enemySpeed = 5;

/**
 * @author Aleksi - constant variables through the app
 */
module.exports = {
    // maximum width and height of the game canvas in pixels
    canvasMaxWidth: canvasMaxWidth,
    // maximum height of the game canvas in pixels
    canvasMaxHeight: canvasMaxHeight,
    // initial player resources
    maxHP: maxHP,
    initRockets: initRockets,
    // player configs
    playerXPos: playerXPos,                     // player default x-pos
    playerHeight: playerHeight,                 // players sprite height in pixels
    playerScale: playerScale,                   // player scaling factor
    playerMovementSpeed: playerMovementSpeed,   // players y-movement speed
    projectileSpeed: projectileSpeed,           // player projectile speed
    mainWeaponDmg: mainWeaponDmg,               // shooting damage
    rocketDmg: rocketDmg,                       // rocket damage
    // enemy configs
    enemySpeed: enemySpeed,                     // enemy movement speed
    // Frames per second
    FPS: FPS,
    // call this in async/await to pause 
    sleep: (ms) => new Promise(res => setTimeout(res, ms)),
    // return scalefactor for responsivity
    scaleFactor: () => window.innerWidth >= canvasMaxWidth ? 1 : window.innerWidth / canvasMaxWidth,
    // handle movement for gameobjects
    handleMovement: async (objArr, stage, removePoint, onRemoval = undefined) => {
        for (let i = objArr.length - 1; i >= 0; i--) {
            if (objArr[i] !== undefined) {
                if ((objArr[i].speed > 0 && objArr[i].x <= removePoint) || (objArr[i].speed < 0 && objArr[i].x >= removePoint)) {
                    objArr[i].x += objArr[i].speed;
                } else {
                    await stage.removeChild(objArr[i]);
                    if (onRemoval != undefined && !objArr[i].removed) {
                        objArr[i].removed = true;
                        onRemoval(objArr[i]);
                    }

                    if (objArr.length > 1) {
                        await objArr.splice(0, i);
                    } else {
                        objArr = [];
                    }
                    break;
                }
            }
        }
        return objArr;
    }
}