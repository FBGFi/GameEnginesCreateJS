// Enemy behaviour
import Constants from "../../constants/commonConstants";
import sprites, {weeds} from "../sprites/sprites.js";

// create.js from window
const createjs = window.createjs;

/**
 * @author Tuukka - create and move background sprites etc
 */
export class BackgroundController {
    state = {

    }
    
    constructor(stage, canvas){
        this.stage = stage;
        canvas.getContext('2d').imageSmoothingEnabled = false;
        this.handleWeeds();
    }

    handleWeeds() {
        let weeds = [];
        let w = sprites.weeds();
        let weedSpriteWidth = w.spriteSheet._frameWidth * Constants.playerScale;
        let weedSpriteHeight = w.spriteSheet._frameHeight * Constants.playerScale;
        let weedsNeeded = Math.ceil(Constants.canvasMaxWidth / weedSpriteWidth);
        for (let i = 0; i < weedsNeeded; i++) {
            let weed = this.createWeed();
            weed.x = weedSpriteWidth * i;
            weed.y = Constants.canvasMaxHeight - weedSpriteHeight;
            weeds.push(weed);
            this.stage.addChild(weed);
        }
    }

    createWeed() {
        let weed = sprites.weeds();
        weed.x = 0;
        weed.y = 0;
        weed.scale = Constants.playerScale;
        return weed;
    }

}