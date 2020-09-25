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

        this.initBackground();
    }

    initBackground = (stage) => {
        let bg = new createjs.Shape();
        bg.graphics.beginFill(Constants.backgroundColor)
        bg.graphics.drawRect(0, 0, Constants.canvasMaxWidth, Constants.canvasMaxHeight); 
        this.stage.addChild(bg);
        console.log(this.stage);
    }

}