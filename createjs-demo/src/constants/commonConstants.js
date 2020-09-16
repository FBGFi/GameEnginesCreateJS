const canvasMaxWidth = 600;

/**
 * @author Aleksi - constant variables through the app
 */
module.exports = {
    // maximum width of the game canvas in pixels
    canvasMaxWidth: canvasMaxWidth,
    // call this in async/await to pause 
    sleep: (ms) => new Promise(res => setTimeout(res, ms)),
    // return scalefactor for responsivity
    scaleFactor: () => window.innerWidth >= canvasMaxWidth ? 1 : window.innerWidth / canvasMaxWidth
}