// Enemy behaviour

import Constants, { canvasMaxHeight, canvasMaxWidth } from "../../constants/commonConstants";
// Animated spritesheets
import blobSpritesheet from "../sprites/blob_spritesheet.png";
import haamuSpritesheet from "../sprites/haamu_spritesheet.png";
import spinnerSpritesheet from "../sprites/spinner_spritesheet.png";
// Static bitmaps
import longboyBitmap from "../sprites/longboy.png";
// create.js from window
const createjs = window.createjs;
// SpritesheetObjects from spritesheet jason data
const blobSpritesheetObject = new createjs.SpriteSheet({
    images: [blobSpritesheet],
    frames: {width: 7, height: 5, count: 2},
    framerate: 5,
    animations: {
        idle:[0,1]
    }
});
const haamuSpritesheetObject= new createjs.SpriteSheet({
    images: [haamuSpritesheet],
    frames: {width: 5, height: 5, count: 2},
    framerate: 5,
    animations: {
        idle:[0,1]
    }
});
const spinnerSpritesheetObject = new createjs.SpriteSheet({
    images: [spinnerSpritesheet],
    frames: {width: 6, height: 6, count: 4},
    framerate: 5,
    animations: {
        idle:[0,1,2,3]
    }
});

const sprites = {
    blob: () => {return new createjs.Sprite(blobSpritesheetObject, "idle")},
    haamu: () => {return new createjs.Sprite(haamuSpritesheetObject, "idle")},
    spinner: () => {return new createjs.Sprite(spinnerSpritesheetObject, "idle")},
    longboy: () => {return new createjs.Bitmap(longboyBitmap)}
}

/**
 * @author Sami - class controlling enemies
 */
export class EnemyController {
    // Single enemy control
    state = {
        maxHP: 1,
        currentHP: 1,
        pos: {
            x: 0,
            y:  0
        }
    }
    
    constructor(){
        this.state.currentHP = this.state.maxHP;
        this.state.pos.x = Constants.canvasMaxWidth * 1.05;
        this.state.pos.y = Constants.canvasMaxHeight * (Math.random() * 0.9 + 0.05);
        this.enemies = [];
        this.spawnEnemies(10);
    }

    move = (x, y) => {
        let poxX = this.state.pos.x += x;
        let posY = this.state.pos.y += y;
    }

    takeDamage = (damage) => {
        let newHP = this.state.currentHP -= damage;

        if (newHP <= 0) {
            return this.destructor;
        }
    }

    destructor() {
        let dropObject = Math.random() < 0.1 ? true : false;
        if (dropObject === true) {
            
        }
    }

    // General enemy control
    spawnEnemies = (n) => {
        for(let i = 0; i < n; i++) {
            this.enemies.push(this.createEnemy(i));
        }
    }

    createEnemy = (i) => {
        let r = Math.random();
        let enemy;

        if (r >= 0.5) {
            enemy = sprites.blob();
        } else if (r >= 0.25) {
            enemy = sprites.longboy();
        } else if (r >= 0.1) {
            enemy = sprites.spinner();
        } else {
            enemy = sprites.haamu();
        }

        enemy.scale = Constants.playerScale;
        enemy.x = Constants.canvasMaxWidth - 50;
        enemy.y = i * 50;
        console.log("Enemy created at: " + enemy.x + ", " + enemy.y);
        return enemy
    }

    destroyEnemy = (i) => {
    }
}