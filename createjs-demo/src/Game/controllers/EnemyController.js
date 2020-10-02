// Enemy behaviour
import Constants, { canvasMaxHeight, canvasMaxWidth } from "../../constants/commonConstants";
import sprites, {blob, haamu,spinner,longboy, explosion} from "../sprites/sprites.js";

// create.js from window
const createjs = window.createjs;

/**
 * @author Sami - class controlling enemies
 */
export class EnemyController {
    // Single enemy control
    
    constructor(stage, dealDMG){
        this.stage = stage;
        this.enemies = [];
        this.explosions = new createjs.Container();
        this.dealDMG = dealDMG;
        this.spawnEnemies(1);
        // this.handleEnemyMovement();
        // this.createTestExplosions();

        // createjs.Ticker.setFPS(Constants.FPS);
        createjs.Ticker.addEventListener("tick", this.handleTick);
        // createjs.Sound.setVolume(0.5);
    }

    /**
     * @author Sami - Move this enemy on the game stage for the amount of x and y
     * @param {*} enemy
     * @param {Number} x
     * @param {Number} y
     */
    move = (enemy, x, y) => {
        enemy.x -= x;
        enemy.y -= y;
    }

    /**
     * @author Sami - The enemy takes damage for the amount of damage variable
     * @param {Number} damage 
     */
    takeDamage = (enemy, damage) => {
        let newHP = enemy.hp = enemy.hp - damage;
        if (newHP <= 0) {
            this.destructor(enemy);
        }
    }

    removeEnemy = (enemy, i) => {
        this.stage.removeChild(enemy);
        this.enemies.splice(i, 1);
    }

    /**
     * @author Sami - The enemy is destroyed and it creates a random number while doing so
     */
    destructor(enemy) {
        this.removeEnemy(enemy);
        return Math.random() < 0.1 ? true : false;
    }

    // General enemy control
    spawnEnemies = (n) => {
        setInterval(() => {
            for(let i = 0; i < n; i++) {
                let enemy = this.createEnemy(2)
                this.enemies.push(enemy);
                this.stage.addChild(enemy);
            }
        }, 2000);
    }

    createEnemy = (hp) => {
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
        enemy.x = Constants.canvasMaxWidth;
        enemy.y = Constants.canvasMaxHeight * (Math.random(Math.floor(Math.random) * 10) * 0.9 + 0.05);
        enemy.hp = hp;
        // enemy.x = 0;
        // enemy.y = 0; 

        // enemy.scale = Constants.playerScale;
        // enemy.x = Constants.canvasMaxWidth - 50;
        // enemy.y = i * 50;
        return enemy
    }

    handleEnemyMovement = () => {
        for (let i = 0; i < this.enemies.length; i++) {
            this.move(this.enemies[i], 5, 0);
            if (this.enemies[i].x === 0 - Constants.playerHeight) {
                this.dealDMG(5); // dmg should be different for each enemy
                this.removeEnemy(this.enemies[i], i);
            }
        }
        
    }

    createTestExplosions() {
        for (let i = 0; i < 5; i++) {
            let explosion = sprites.explosion();
            explosion.x = 300;
            explosion.y = (Constants.canvasMaxHeight * Math.random());
            explosion.scale = Constants.playerScale;
            this.explosions.addChild(explosion);
        }
        this.stage.addChild(this.explosions);
    }

    removeExplosions = () => {
        for(let j = 0; j < this.explosions.children.length; j++) { 
            if(this.explosions.children[j].currentFrame >= 4) { 
                this.stage.removeChild(this.explosions.children[j]);
                this.explosions.removeChildAt(j); 
            }
        }
    }

    handleTick = (event) => {
        this.handleEnemyMovement();
        this.removeExplosions();
    }
}