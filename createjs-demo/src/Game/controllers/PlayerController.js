// Player functionalities
import Constants from "../../constants/commonConstants";

import rocketSprite from "../sprites/rocket.png";
import bulletSprite from "../sprites/bullet.png";
import sprites from "../sprites/sprites";

const projectileHit = (x,y) => {
    let xplo = sprites.explosion();
    xplo.x = x;
    xplo.y = y;
    xplo.scale = Constants.playerScale;
    return xplo;
}

const createjs = window.createjs;

/**
 * @author Aleksi - class controlling player actions
 */
export class PlayerController {
    state = {
        rocketsLeft: Constants.initRockets,
        posY: 0,
        projectiles: [],
        playerDirection: Constants.tokens.playerDirection.none,
        shooting: false,
        goingUp: false,
        goingDown: false
    }

    constructor(stage, updateUi, changeHP, addScore) {
        this.state.posY = Constants.canvasMaxWidth * 0.5625 / 2;
        this.stage = stage;
        this.updateUi = updateUi;
        this.changeHP = changeHP;
        this.addScore = addScore;

        document.onkeydown = this.handleKeyDown;
        document.onkeyup = this.handleKeyUp;
        document.onkeypress = this.handleKeyPress;
    }

    handleKeyPress = e => {
        switch (e.key) {
            case "Space":
            case " ":
                if (!this.state.shooting) {
                    this.state.shooting = true;
                    this.shoot(Constants.tokens.weapons.main);
                }
                break;
            case "KeyR":
            case "r":
                if (!this.state.shooting) {
                    this.state.shooting = true;
                    this.shoot(Constants.tokens.weapons.rocket);
                }
                break;
            default:
                break;
        }
    }

    handleKeyDown = e => {
        switch (e.key) {
            case "w":
            case "ArrowUp":
                this.state.goingUp = true;
                this.state.playerDirection = Constants.tokens.playerDirection.up;
                break;
            case "s":
            case "ArrowDown":
                this.state.goingDown = true;
                this.state.playerDirection = Constants.tokens.playerDirection.down;
                break;
            default:
                break;
        }
    }

    handleKeyUp = e => {
        switch (e.key) {
            case "w":
            case "ArrowUp":
                this.state.goingUp = false;
                if (!this.state.goingDown && !this.state.goingUp) {
                    this.state.playerDirection = Constants.tokens.playerDirection.none;
                } else if (this.state.goingDown) {
                    this.state.playerDirection = Constants.tokens.playerDirection.down;
                }
                break;
            case "s":
            case "ArrowDown":
                this.state.goingDown = false;
                if (!this.state.goingDown && !this.state.goingUp) {
                    this.state.playerDirection = Constants.tokens.playerDirection.none;
                } else if (this.state.goingUp) {
                    this.state.playerDirection = Constants.tokens.playerDirection.up;
                }
                break;
            case " ":
            case "r":
                this.state.shooting = false;
                break;
            default:
                break;
        }
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
     * @author Aleksi - player is shooting
     * @param {String} weapon - "MAIN" or "ROCKET"
     */
    shoot = (weapon) => {
        if (weapon === Constants.tokens.weapons.main) {
            this.createProjectile(weapon)
            createjs.Sound.play(Constants.tokens.sounds.playerShoot);
        }
        else if (weapon === Constants.tokens.weapons.rocket && this.state.rocketsLeft > 0) {
            this.state.rocketsLeft--;
            this.createProjectile(weapon);
            createjs.Sound.play(Constants.tokens.sounds.rocket);
        }
    }

    /**
     * @author Aleksi - handle player movement
     * @param {Object} player - player object drawn to stage
     */
    playerMovement = (player) => {
        switch (this.state.playerDirection) {
            case Constants.tokens.playerDirection.up:
                if (this.state.posY > 0) {
                    this.state.collided = false;
                    this.move(Constants.playerMovementSpeed);
                    player.y = this.state.posY;
                } else if (!this.state.collided) {
                    this.state.collided = true;
                    createjs.Sound.play(Constants.tokens.sounds.playerHit);
                    this.changeHP(-5);
                }
                break;
            case Constants.tokens.playerDirection.down:
                if (this.state.posY < Constants.canvasMaxHeight - (Constants.playerHeight * Constants.playerScale)) {
                    this.state.collided = false;
                    this.move(-Constants.playerMovementSpeed);
                    player.y = this.state.posY;
                } else if (!this.state.collided) {
                    this.state.collided = true;
                    createjs.Sound.play(Constants.tokens.sounds.playerHit);
                    this.changeHP(-5);
                }
                break;

            default:
                break;
        }
    }

    addRockets = amount => {
        this.state.rocketsLeft += amount;
        this.updateUi({ rocketsLeft: this.state.rocketsLeft});
    }

    /**
     * @author Aleksi - create player projectiles
     * @param {String} type - "MAIN" / "ROCKET"
     */
    createProjectile = type => {
        let projectile;
        let scale;
        switch (type) {
            case Constants.tokens.weapons.main:
                scale = 5;
                projectile = new createjs.Bitmap(bulletSprite);
                projectile.y = this.state.posY + (Constants.playerHeight * Constants.playerScale / 2) - (scale / 2);
                break;
            case Constants.tokens.weapons.rocket:
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
            if (!enemies[i].destroyed) {
                for (let j = 0; j < this.state.projectiles.length; j++) {
                    if (this.state.projectiles[j].destroyed) { }
                    else if (
                        (this.state.projectiles[j].y > enemies[i].y && this.state.projectiles[j].y < enemies[i].y + (enemies[i].scale * Constants.enemyHitBoxSize))
                        ||
                        (this.state.projectiles[j].y < enemies[i].y && this.state.projectiles[j].y + (this.state.projectiles[j].scale * Constants.playerHeight) > enemies[i].y)) {
                        if ((this.state.projectiles[j].x > enemies[i].x && this.state.projectiles[j].x < enemies[i].x + (enemies[i].scale * Constants.enemyHitBoxSize))
                            ||
                            (this.state.projectiles[j].x < enemies[i].x && this.state.projectiles[j].x + (this.state.projectiles[j].scale * Constants.playerHeight) > enemies[i].x)) {
                            
                            this.state.projectiles[j].destroyed = true;
                            enemies[i].hp -= this.state.projectiles[j].weapon == Constants.tokens.weapons.main ? Constants.mainWeaponDmg : Constants.rocketDmg;
                                
                            if(this.state.projectiles[j].weapon == Constants.tokens.weapons.rocket){
                                let xplo = projectileHit(this.state.projectiles[j].x, this.state.projectiles[j].y);
                                this.stage.addChild(xplo);
                                createjs.Sound.play(Constants.tokens.sounds.explosion);
                                setTimeout(() => {this.stage.removeChild(xplo)}, 500);
                            }

                            if (enemies[i].hp <= 0) {
                                enemies[i].destroyed = true;
                                this.addScore(enemies[i].score);
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * @author Aleksi - check if objects hit player
     * @param {Object} objArr - array of gameobjects
     */
    checkIfHitByObject = (objArr) => {
        for (let i = 0; i < objArr.length; i++) {
            if (
                !objArr[i].destroyed 
                && 
                objArr[i].x <= Constants.playerXPos + (Constants.playerHeight * Constants.playerScale)
                &&
                objArr[i].x >= Constants.playerXPos
                ) {
                if (
                    (objArr[i].y > this.state.posY && objArr[i].y < this.state.posY + (Constants.playerHeight * Constants.playerScale))
                    ||
                    (objArr[i].y < this.state.posY && objArr[i].y > this.state.posY - (Constants.playerHeight * Constants.playerScale))
                ) {
                    if(objArr[i].damage != undefined){
                        objArr[i].damage *= 2;
                    }
                    objArr[i].hitPlayer = true;
                    objArr[i].destroyed = true;
                }
            }
        }
    }
}