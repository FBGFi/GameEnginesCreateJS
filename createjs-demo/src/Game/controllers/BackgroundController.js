// Enemy behaviour
import Constants from "../../constants/commonConstants";
import sprites, {} from "../sprites/sprites.js";

// create.js from window
const createjs = window.createjs;

/**
 * @author Tuukka - control background sprites etc
 */
export class BackgroundController {
    // Single enemy control
    state = {

    }
    
    constructor(stage, canvas){
        this.stage = stage;
        canvas.getContext('2d').imageSmoothingEnabled = false;
    }

}