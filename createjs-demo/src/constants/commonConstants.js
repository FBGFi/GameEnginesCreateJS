const canvasMaxWidth = 1280;
const canvasMaxHeight = canvasMaxWidth * 0.5625;
const maxHP = 50;
const initRockets = 3;
const playerXPos = canvasMaxWidth * 0.05;
const playerMovementSpeed = 10;
const FPS = 60;
const playerHeight = 5;
const playerScale = 5;

/**
 * @author Aleksi - constant variables through the app
 */
module.exports = {
    // maximum width and height of the game canvas in pixels
    canvasMaxWidth: canvasMaxWidth,
    // maximum height of the game canvas in pixels
    canvasMaxHeight: canvasMaxHeight,
    // max HP of the player
    maxHP: maxHP,
    // amount of rockets at the beginning of the game
    initRockets: initRockets,
    // player position on X-axis
    playerXPos: playerXPos,
    // player movement speed
    playerMovementSpeed: playerMovementSpeed,
    // Frames per second
    FPS: FPS,
    // player height in pixels
    playerHeight: playerHeight,
    // player scale multiplier
    playerScale: playerScale,
    // call this in async/await to pause 
    sleep: (ms) => new Promise(res => setTimeout(res, ms)),
    // return scalefactor for responsivity
    scaleFactor: () => window.innerWidth >= canvasMaxWidth ? 1 : window.innerWidth / canvasMaxWidth
}