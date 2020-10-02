// Enemy behaviour
import Constants from "../../constants/commonConstants";
import sprites, {weed} from "../sprites/sprites.js";

// create.js from window
const createjs = window.createjs;

/**
 * @author Tuukka - create and move background sprites etc
 */
export class BackgroundController {
    state = {

    }
    
    constructor(stage, canvas){
        canvas.getContext('2d').imageSmoothingEnabled = false;
        this.stage = stage;

        // this is a placeholder weed for getting the properties
        let w = sprites.weed();
        this.weedSpriteWidth = w.spriteSheet._frameWidth * Constants.playerScale;
        this.weedSpriteHeight = w.spriteSheet._frameHeight * Constants.playerScale;
        this.weedsNeeded = Math.ceil(Constants.canvasMaxWidth / this.weedSpriteWidth) + 1;

        this.weeds = [];
        this.highestWeed = 0;
        this.weedSpeed = Constants.weedSpeed;
        this.swpawnWeeds();
    }

    handleWeeds = () => {
        for(let w = 0; w < this.weeds.length; w++) {
            this.weeds[w].x += this.weedSpeed;
            if (this.weeds[w].x < -this.weedSpriteWidth) {
                this.weeds[w].x = this.weeds[this.highestWeed].x + this.weedSpriteWidth;
                this.highestWeed = w;
            }
        }
    }

    swpawnWeeds() {
        for (let i = 0; i < this.weedsNeeded; i++) {
            let weed = this.createWeed();
            weed.x = this.weedSpriteWidth * i;
            weed.y = Constants.canvasMaxHeight - this.weedSpriteHeight;
            this.weeds.push(weed);
            this.stage.addChild(weed);
            this.highestWeed = i;
        }
    }

    createWeed() {
        let weed = sprites.weed();
        weed.x = 0;
        weed.y = 0;
        weed.scale = Constants.playerScale;
        return weed;
    }

}