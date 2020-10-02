// Sprites to export
// Animated spritesheets
import blobSpritesheet from "./blob_spritesheet.png";
import haamuSpritesheet from "./haamu_spritesheet.png";
import spinnerSpritesheet from "./spinner_spritesheet.png";
import weedsSpritesheet from "./weeds_spritesheet.png";
import explosionSpritesheet from "./explosion_spritesheet.png";
// Static bitmaps
import longboyBitmap from "./longboy.png";
import bulletBitmap from "./bullet.png";
import rocketBitmap from "./rocket.png";
// create.js from window
const createjs = window.createjs;

// SpritesheetObjects from spritesheet jason data
const blob  = () => {
let blob = new createjs.Sprite(new createjs.SpriteSheet({
    images: [blobSpritesheet],
    frames: {width: 7, height: 5, count: 2},
    framerate: 5,
    animations: {
        idle:[0,1]
    }
}), "idle");
return blob
}

const haamu  = () => {
let haamu = new createjs.Sprite(new createjs.SpriteSheet({
    images: [haamuSpritesheet],
    frames: {width: 5, height: 5, count: 2},
    framerate: 5,
    animations: {
        idle:[0,1]
    }
}), "idle");
return haamu
}

const spinner = () => {
let spinner =  new createjs.Sprite(new createjs.SpriteSheet({
        images: [spinnerSpritesheet],
        frames: {width: 6, height: 6, count: 4},
        framerate: 5,
        animations: {
            idle:[0,1,2,3]
        }
    }), "idle");
return spinner;
}

const weeds = () => {
let weed =  new createjs.Sprite(new createjs.SpriteSheet({
    images: [weedsSpritesheet],
    frames: {width: 100, height: 30, count: 3},
    framerate: 3,
    animations: {
        idle:[0,1,2]
    }
}), "idle");
return weed;
}

const explosion  = () => {
let explosion = new createjs.Sprite(new createjs.SpriteSheet({
    images: [explosionSpritesheet],
    frames: {width: 5, height: 5, count: 5},
    framerate: 8,
    animations: {
        explode:[0,1,2,3,4]
    }
}), "explode");
return explosion
}

const longboy  = () => {
    let longboy = new createjs.Bitmap(longboyBitmap);
    return longboy
}
const bullet  = () => {
    let bullet = new createjs.Bitmap(bulletBitmap);
    return bullet
}
const rocket  = () => {
    let rocket = new createjs.Bitmap(rocketBitmap);
    return rocket
}

export default {blob, haamu,spinner,longboy, bullet, rocket, weeds, explosion}