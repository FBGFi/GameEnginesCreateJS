const canvasMaxWidth = 1280;
const canvasMaxHeight = canvasMaxWidth * 0.5625;
const maxHP = 50;
const initRockets = 3;
const playerXPos = canvasMaxWidth * 0.05;

/**
 * @author Aleksi - constant variables through the app
 */
module.exports = {
    // maximum width of the game canvas in pixels
    canvasMaxWidth: canvasMaxWidth,
    // maximum height of the game canvas in pixels
    canvasMaxHeight: canvasMaxHeight,
    // max HP of the player
    maxHP: maxHP,
    // amount of rockets at the beginning of the game
    initRockets: initRockets,
    // player position on X-axis
    playerXPos: playerXPos,
    // call this in async/await to pause 
    sleep: (ms) => new Promise(res => setTimeout(res, ms)),
    // return scalefactor for responsivity
    scaleFactor: () => window.innerWidth >= canvasMaxWidth ? 1 : window.innerWidth / canvasMaxWidth
}