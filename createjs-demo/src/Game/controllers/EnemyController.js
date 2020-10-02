// Enemy behaviour
import Constants, { canvasMaxHeight, canvasMaxWidth } from "../../constants/commonConstants";
import sprites, { blob, haamu, spinner, longboy, explosion } from "../sprites/sprites.js";

// create.js from window
const createjs = window.createjs;

const enemy1 = () => {
    let enemy = sprites.blob();
    const hp = 3;
    const speed = 4;
    enemy.hp = hp;
    enemy.speed = speed;
    return enemy;
}

const enemy2 = () => {
    let enemy = sprites.longboy();
    const hp = 1;
    const speed = 8;
    enemy.hp = hp;
    enemy.speed = speed;
    return enemy;
}

const enemy3 = () => {
    let enemy = sprites.spinner();
    const hp = 4;
    const speed = 2;
    enemy.hp = hp;
    enemy.speed = speed;
    return enemy;
}

const enemy4 = () => {
    let enemy = sprites.haamu();
    const hp = 2;
    const speed = 6;
    enemy.hp = hp;
    enemy.speed = speed;
    return enemy;
}

/**
 * @author Sami - class controlling enemies
 */
export class EnemyController {
    // Single enemy control

    constructor(stage, dealDMG) {
        this.stage = stage;
        this.enemies = [];
        this.explosions = new createjs.Container();
        this.dealDMG = dealDMG;
        //this.spawnEnemies(1);
        // this.handleEnemyMovement();
        // this.createTestExplosions();

        createjs.Ticker.addEventListener("tick", this.handleTick);
    }

    /**
     * @author Sami - Move this enemy on the game stage for the amount of x and y
     * @param {*} enemy
     */
    move = (enemy) => {
        enemy.x -= enemy.speed;
        enemy.y -= 0;
    }

    /**
     * @author Sami - The enemy takes damage for the amount of damage variable
     * @param {*} enemy 
     * @param {Number} damage 
     */
    takeDamage = (enemy, damage) => {
        let newHP = enemy.hp = enemy.hp - damage;
        if (newHP <= 0) {
            this.destructor(enemy);
        }
    }

    /**
     * @author Sami - removes the enemy but doesn't count it as the players merit
     * @param {*} enemy 
     * @param {Number} i 
     */
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

    // // General enemy control
    // spawnEnemies = (n) => {
    //     setInterval(() => {
    //         for(let i = 0; i < n; i++) {
    //             let enemy = this.createEnemy(2)
    //             this.enemies.push(enemy);
    //             this.stage.addChild(enemy);
    //         }
    //     }, 2000);
    // }

    createEnemy = () => {
        let r = Math.random();
        let enemy;

        if (r >= 0.5) {
            enemy = enemy1();
            enemy.damage = 1;
        } else if (r >= 0.25) {
            enemy = enemy2();
            enemy.damage = 3;
        } else if (r >= 0.1) {
            enemy = enemy3();
            enemy.damage = 5;
        } else {
            enemy = enemy4();
            enemy.damage = 2;
        }
        
        // Initialize some attributes
        enemy.scale = Constants.playerScale;
        enemy.x = Constants.canvasMaxWidth;
        enemy.y = Constants.canvasMaxHeight * (Math.random(Math.floor(Math.random) * 10) * 0.9 + 0.05);   
        enemy.hp = hp;
        enemy.speed = -11;
        // Get a new random y position if any existing enemy already has that same y position -> no overlapping enemies
        //let hasUniqueYPos;
        //do {
        //    hasUniqueYPos = true;
        //    for (let i = 0; i < this.enemies.length; i++) {
        //        if (enemy.y >= this.enemies[i].y - 50 && enemy.y <= this.enemies[i].y + 50) {
        //            enemy.y = Constants.canvasMaxHeight * (Math.random(Math.floor(Math.random) * 10) * 0.9 + 0.05);
        //            hasUniqueYPos = false;
        //        }
        //    }
        //} while (!hasUniqueYPos);
        
        return enemy;
    }
       
    dealDMGtoPlayer = (obj) => {
        this.dealDMG(obj.damage);
    }
    
    handleEnemyMovement = async () => {
        //console.log(this.enemies);
        this.enemies = await Constants.handleMovement(this.enemies, this.stage, -50, this.dealDMGtoPlayer);
        // for (let i = 0; i < this.enemies.length; i++) {
        //     this.move(this.enemies[i], 5, 0);
        //     if (this.enemies[i].x === 0 - Constants.playerHeight) {
        //         this.dealDMG(5); // dmg should be different for each enemy
        //         this.removeEnemy(this.enemies[i], i);
        //     }
        // }

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
        for (let j = 0; j < this.explosions.children.length; j++) {
            if (this.explosions.children[j].currentFrame >= 4) {
                this.stage.removeChild(this.explosions.children[j]);
                this.explosions.removeChildAt(j);
            }
        }
    }
    
    spawnEnemy = () => {
        let enemy = this.createEnemy(2)
        this.enemies.push(enemy);
        this.stage.addChild(enemy);
    }

    /**
     * @author Sami - Updates enemies positions
     * @param {*} event 
     */
    handleTick = (event) => {
        this.removeExplosions();
        if(Math.random() < 0.01){
            this.spawnEnemy();
        }
        this.handleEnemyMovement();
    }
}
