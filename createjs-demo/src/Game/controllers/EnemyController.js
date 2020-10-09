// Enemy behaviour
import Constants from "../../constants/commonConstants";
import sprites from "../sprites/sprites.js";

// create.js from window
const createjs = window.createjs;

const explosion = (x,y) => {
    let xplo = sprites.explosion();
    xplo.x = x;
    xplo.y = y;
    xplo.scale = Constants.playerScale;
    return xplo;
}

const blob = () => {
    let enemy = sprites.blob();
    enemy.hp = 3;
    enemy.score = 30;
    enemy.speed = -4;
    enemy.damage = -1;
    return enemy;
}

const longboy = () => {
    let enemy = sprites.longboy();
    enemy.hp = 1;
    enemy.score = 10;
    enemy.speed = -8;
    enemy.damage = -3;
    enemy.ySpeed = 10;
    enemy.yConstraint = 20;
    return enemy;
}

const spinner = () => {
    let enemy = sprites.spinner();
    enemy.hp = 4;
    enemy.score = 40;
    enemy.speed = -2;
    enemy.damage = -5;
    enemy.ySpeed = 2;
    enemy.yConstraint = 100;
    return enemy;
}

const haamu = () => {
    let enemy = sprites.haamu();
    enemy.hp = 2;
    enemy.score = 20;
    enemy.speed = -6;
    enemy.damage = -2;
    return enemy;
}

/**
 * @author Sami - class controlling enemies
 */
export class EnemyController {
    // Single enemy control

    constructor(stage, changeHP, addRockets) {
        this.stage = stage;
        this.addRockets = addRockets;
        this.enemies = [];
        this.pickUps = [];
        this.changeHP = changeHP;
        this.enemySpawnRate = Constants.initEnemySpawnRate;
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

    createEnemy = () => {
        let r = Math.random();
        let enemy;

        if (r >= 0.5) {
            enemy = blob();
        } else if (r >= 0.25) {
            enemy = longboy();
        } else if (r >= 0.1) {
            enemy = spinner();
        } else {
            enemy = haamu();
        }
        
        // Initialize some attributes
        enemy.scale = Constants.playerScale;
        enemy.x = Constants.canvasMaxWidth;
        enemy.y = Constants.canvasMaxHeight * (Math.random(Math.floor(Math.random) * 10) * 0.9 + 0.05); 
        if(enemy.yConstraint !== undefined){
            enemy.y += enemy.yConstraint;
            if(enemy.y >= Constants.canvasMaxHeight){
                enemy.y -= enemy.yConstraint * 3;
            }
        }
        enemy.yInit = enemy.y;
        enemy.destroyed = false;
        
        return enemy;
    }

    // :P
    spawnPickUp = (x,y) => {
        if(Math.random() < 0.15){
            let pickUp;
            if(Math.random() > 0.7){
                pickUp = sprites.healthPickup();
                pickUp.addResource = () => this.changeHP(10);
                pickUp.soundToken = Constants.tokens.sounds.healthPickup;
            } else {
                pickUp = sprites.rocketPickup();
                pickUp.addResource = () => this.addRockets(2);
                pickUp.soundToken = Constants.tokens.sounds.rocketPickup;
            }
            pickUp.x = x;
            pickUp.y = y;
            pickUp.speed = -5;
            pickUp.scale = Constants.playerScale;
            this.pickUps.push(pickUp);
            this.stage.addChild(pickUp);
        }
    }

    onPickUpRemoval = obj => {
        if(obj.destroyed){
            obj.addResource();
            createjs.Sound.play(obj.soundToken);
        }
    }
       
    onEnemyRemoval = (obj) => {
        if(obj.x < 0 || obj.hitPlayer){
            this.changeHP(obj.damage);
        }
        if(obj.x > 0 && obj.hitPlayer == undefined){
            this.spawnPickUp(obj.x, obj.y);
        }
        if(obj.hitPlayer || obj.x > 0){
            let xplo = explosion(obj.x, obj.y);
            this.stage.addChild(xplo);
            createjs.Sound.play(Constants.tokens.sounds.explosion);
            setTimeout(() => {this.stage.removeChild(xplo)}, 500);
        }
    }
    
    handleEnemyMovement = async () => {
        this.enemies = await Constants.handleMovement(this.enemies, this.stage, -50, this.onEnemyRemoval);
    }

    handlePickUpMovement = async() => {
        this.pickUps = await Constants.handleMovement(this.pickUps, this.stage, -50, this.onPickUpRemoval);
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
        if(Math.round(createjs.Ticker.getTime()) % this.enemySpawnRate < 1000 / Constants.FPS){
            this.spawnEnemy();
        }
        if(Math.round(createjs.Ticker.getTime()) % Constants.gameSpeedUpInterval < 1000 / Constants.FPS){
            if(this.enemySpawnRate > 100) this.enemySpawnRate -= 100;
        }
        this.handleEnemyMovement();
        this.handlePickUpMovement();
    }
}
