// Enemy behaviour
import Constants from "../../constants/commonConstants";
import sprites, {weeds} from "../sprites/sprites.js";

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
        this.handleWeeds();
    }

    handleWeeds() {
        let weeds = [];
        let weedSpriteWidth = 300;
        let weedsNeeded = Math.ceil(Constants.canvasMaxWidth / weedSpriteWidth);
        for (let i = 0; i < weedsNeeded; i++) {
            let weed = this.createWeed();
            weed.x = weedSpriteWidth * i;
            weeds.push(weed);
            this.stage.addChild(weed);
        }
        console.log(weeds[2].x);
    }

    createWeed() {
        let weed = sprites.weeds();
        weed.x = 0;
        weed.y = 0;
        weed.scale = Constants.playerScale;
        return weed;
    }

}