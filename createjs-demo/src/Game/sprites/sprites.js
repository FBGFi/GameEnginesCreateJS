// Sprites to export
// Animated spritesheets
import blobSpritesheet from "./blob_spritesheet.png";
import haamuSpritesheet from "./haamu_spritesheet.png";
import spinnerSpritesheet from "./spinner_spritesheet.png";
// Static bitmaps
import longboyBitmap from "./longboy.png";
// create.js from window
const createjs = window.createjs;

// SpritesheetObjects from spritesheet jason data
const blob = new createjs.Sprite(new createjs.SpriteSheet({
    images: [blobSpritesheet],
    frames: {width: 7, height: 5, count: 2},
    framerate: 5,
    animations: {
        idle:[0,1]
    }
}), "idle");

const haamu = new createjs.Sprite(new createjs.SpriteSheet({
    images: [haamuSpritesheet],
    frames: {width: 5, height: 5, count: 2},
    framerate: 5,
    animations: {
        idle:[0,1]
    }
}), "idle");

const spinner = new createjs.Sprite(new createjs.SpriteSheet({
    images: [spinnerSpritesheet],
    frames: {width: 6, height: 6, count: 4},
    framerate: 5,
    animations: {
        idle:[0,1,2,3]
    }
}), "idle");

const longboy = new createjs.Bitmap(longboyBitmap);

export default {blob, haamu,spinner,longboy}