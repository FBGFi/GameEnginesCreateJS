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
        currentHP: 0,
        pos: {
            x: Constants.canvasMaxWidth,
            y:  Constants.canvasMaxHeight * (Math.random(Math.floor(Math.random) * 10) * 0.9 + 0.05)
        }
    }
    
    constructor(){
        this.state.currentHP = this.state.maxHP;
        this.state.pos.x = Constants.canvasMaxWidth * 1.05;
        this.state.pos.y = Constants.canvasMaxHeight * (Math.random() * 0.9 + 0.05);
        this.enemies = [];
        this.spawnEnemies(2);
    }

    /**
     * @author Sami - Move this enemy on the game stage for the amount of x and y
     * @param {Number} x 
     * @param {Number} y 
     */
    move = (x, y) => {
        this.enemies.x += x;
        this.enemies.y += y;

        return { x: x, y: y};
    }

    /**
     * @author Sami - The enemy takes damage for the amount of damage variable
     * @param {Number} damage 
     */
    takeDamage = (damage) => {
        let newHP = this.state.currentHP -= damage;
        if (newHP <= 0) {
            return this.destructor;
        }
    }

    /**
     * @author Sami - The enemy is destroyed and it creates a random number while doing so
     */
    destructor() {
        return Math.random() < 0.1 ? true : false;
    }

    // General enemy control
    spawnEnemies = (n) => {
        setInterval(() => {
            for(let i = 0; i < n; i++) {
                this.enemies.push(this.createEnemy(i));
            }

        }, 2000);
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
        // console.log("Enemy created at: " + enemy.x + ", " + enemy.y);
        return enemy
    }

    destroyEnemy = (i) => {
    }
}