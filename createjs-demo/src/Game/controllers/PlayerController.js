// Player functionalities
import Constants from "../../constants/commonConstants";

import rocketSprite from "../sprites/rocket.png";
import bulletSprite from "../sprites/bullet.png";
import shootSound from "../assets/sounds/shoot.wav";
import rocketSound from "../assets/sounds/rocket.wav";
import hurtSound from "../assets/sounds/hurt.wav";

const createjs = window.createjs;

/**
 * @author Aleksi - class controlling player actions
 */
export class PlayerController {
    state = {
        rocketsLeft: Constants.initRockets,
        posY: 0,
        projectiles: []
    }

    constructor(stage, updateUi, takeDMG) {
        this.state.posY = Constants.canvasMaxWidth * 0.5625 / 2;
        this.stage = stage;
        this.updateUi = updateUi;
        this.takeDMG = takeDMG;
        createjs.Sound.registerSound(shootSound, "shoot");
        createjs.Sound.registerSound(rocketSound, "rocket");
        createjs.Sound.registerSound(hurtSound, "hurt");
    }

    /**
     * @author Aleksi - move the player on Y-axis
     * @param {Number} y - amount moved
     */
    move = (y) => {
        if (this.state.posY - y >= Constants.canvasMaxHeight - (Constants.playerHeight * Constants.playerScale)) {
            this.state.posY = Constants.canvasMaxHeight - (Constants.playerHeight * Constants.playerScale);
        }
        else if (this.state.posY - y <= 0) {
            this.state.posY = 0;
        }
        else {
            this.state.posY -= y;
        }
    }

    /**
     * @author Aleksi - increase or decrease currentHP
     * @param {Number} hp - amount changed
     */
    // hpChanged = (hp) => {
    //     let compHp = this.state.currentHP += hp;
    //     this.state.currentHP = compHp > Constants.maxHP ? Constants.maxHP : compHp;
    // }

    /**
     * @author Aleksi - player is shooting
     * @param {String} weapon - "MAIN" or "ROCKET"
     */
    shoot = (weapon) => {
        if (weapon === "MAIN") {
            this.createProjectile(weapon)
            createjs.Sound.play("shoot");
        }
        else if (weapon === "ROCKET" && this.state.rocketsLeft > 0) {
            this.state.rocketsLeft--;
            this.createProjectile(weapon);
            createjs.Sound.play("rocket");
        }
    }

    /**
     * @author Aleksi - handle player movement
     * @param {Object} player - player object drawn to stage
     * @param {String} direction - "UP" / "DOWN"
     */
    playerMovement = (player, direction) => {
        switch (direction) {
            case "UP":
                if (this.state.posY > 0) {
                    this.state.collided = false;
                    this.move(Constants.playerMovementSpeed);
                    player.y = this.state.posY;
                } else if (!this.state.collided) {
                    this.state.collided = true;
                    createjs.Sound.play("hurt");
                    this.takeDMG(5);
                }
                break;
            case "DOWN":
                if (this.state.posY < Constants.canvasMaxHeight - (Constants.playerHeight * Constants.playerScale)) {
                    this.state.collided = false;
                    this.move(-Constants.playerMovementSpeed);
                    player.y = this.state.posY;
                } else if (!this.state.collided) {
                    this.state.collided = true;
                    createjs.Sound.play("hurt");
                    this.takeDMG(5);
                }
                break;

            default:
                break;
        }
    }

    /**
     * @author Aleksi - create player projectiles
     * @param {String} type - "MAIN" / "ROCKET"
     */
    createProjectile = type => {
        let projectile;
        let scale;
        switch (type) {
            case "MAIN":
                scale = 5;
                projectile = new createjs.Bitmap(bulletSprite);
                projectile.y = this.state.posY + (Constants.playerHeight * Constants.playerScale / 2) - (scale / 2);
                break;
            case "ROCKET":
                scale = 4;
                projectile = new createjs.Bitmap(rocketSprite);
                projectile.y = this.state.posY + (Constants.playerHeight * Constants.playerScale / 2) - (scale + scale / 2);
                this.updateUi({ rocketsLeft: this.state.rocketsLeft });
                break;
            default:
                break;
        }
        projectile.scale = scale;
        projectile.weapon = type;
        projectile.x = Constants.playerXPos;
        projectile.speed = Constants.projectileSpeed;
        this.state.projectiles.push(projectile);
        this.stage.addChild(projectile);
    }

    /**
     * @author Aleksi - move the projectiles
     */
    handleProjectileMovement = async () => {
        this.state.projectiles = await Constants.handleMovement(this.state.projectiles, this.stage, Constants.canvasMaxWidth);
    }

    /**
     * @author Aleksi - check whether any bullets hit enemies
     */
    checkIfEnemyHit = (enemies) => {
        for (let i = 0; i < enemies.length; i++) {
            for (let j = 0; j < this.state.projectiles.length; j++) {
                if (this.state.projectiles[j].destroyed) { }
                else if ((this.state.projectiles[j].y > enemies[i].y
                    &&
                    this.state.projectiles[j].y < enemies[i].y + (enemies[i].scale * Constants.enemyHitBoxSize))
                    ||
                    (this.state.projectiles[j].y < enemies[i].y
                        &&
                        this.state.projectiles[j].y + (this.state.projectiles[j].scale * Constants.playerHeight) > enemies[i].y)) {
                    if ((this.state.projectiles[j].x > enemies[i].x
                        &&
                        this.state.projectiles[j].x < enemies[i].x + (enemies[i].scale * Constants.enemyHitBoxSize))
                        ||
                        (this.state.projectiles[j].x < enemies[i].x
                            &&
                            this.state.projectiles[j].x + (this.state.projectiles[j].scale * Constants.playerHeight) > enemies[i].x)) {
                        this.state.projectiles[j].destroyed = true;
                        enemies[i].hp -= this.state.projectiles[j].weapon == "MAIN" ? Constants.mainWeaponDmg : Constants.rocketDmg;
                        if (enemies[i].hp <= 0) {
                            enemies[i].destroyed = true;
                        }
                    }
                }
            }
        }
    }
}